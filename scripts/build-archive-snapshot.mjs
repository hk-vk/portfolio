import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [commit, slug] = process.argv.slice(2);

if (!commit || !slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error('Usage: pnpm archive:build <commit> <year-slug>');
  process.exit(1);
}

const worktreesRoot = join(root, '.archive-worktrees');
const worktree = join(worktreesRoot, slug);
const output = join(root, 'public', 'archive-builds', slug);
const base = `/archive-builds/${slug}/`;

const run = (command, args, options = {}) => {
  console.log(`> ${command} ${args.join(' ')}`);
  execFileSync(command, args, {
    cwd: options.cwd || root,
    stdio: 'inherit',
    env: { ...process.env, ...options.env },
  });
};

const patchRouterBase = () => {
  const candidates = ['src/App.jsx', 'src/App.tsx'].map((path) => join(worktree, path));
  const appPath = candidates.find(existsSync);
  if (!appPath) throw new Error('Could not find src/App.jsx or src/App.tsx in the selected commit.');

  const source = readFileSync(appPath, 'utf8');
  if (source.includes('basename={import.meta.env.BASE_URL}')) return;

  const patched = source.replace(
    /<Router(?=\s|>)/,
    '<Router basename={import.meta.env.BASE_URL}',
  );
  if (patched === source) {
    throw new Error('Could not add the archive basename to BrowserRouter.');
  }
  writeFileSync(appPath, patched);
};

mkdirSync(worktreesRoot, { recursive: true });
rmSync(output, { recursive: true, force: true });

if (existsSync(worktree)) {
  run('git', ['worktree', 'remove', '--force', worktree]);
}

try {
  run('git', ['worktree', 'add', '--detach', worktree, commit]);
  patchRouterBase();

  run('pnpm', ['install', '--frozen-lockfile'], { cwd: worktree });
  run(
    'pnpm',
    ['exec', 'vite', 'build', `--base=${base}`, '--outDir', output, '--emptyOutDir'],
    { cwd: worktree },
  );

  const metadata = {
    commit,
    slug,
    base,
    builtAt: new Date().toISOString(),
  };
  writeFileSync(join(output, 'archive-meta.json'), `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(`\nArchive snapshot ready: ${output}`);
} finally {
  if (existsSync(worktree)) {
    run('git', ['worktree', 'remove', '--force', worktree]);
  }
}
