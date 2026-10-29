// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/assets/*",
    "/social/*",
    "/fonts/*",
    "/favicon.svg",
    "/*.js",
    "/*.css",
    "/*.json",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.gif",
    "/*.svg",
    "/*.ico",
    "/*.woff",
    "/*.woff2",
    "/*.ttf",
    "/*.eot"
  ]
};

// ../../../.npm/_npx/c943b712072b77c4/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/harikrishnan/coding/personal/portfolio/.wrangler/tmp/pages-nliQli/functionsWorker-0.6202401873468165.mjs";
import { isRoutingRuleMatch } from "/Users/harikrishnan/.npm/_npx/c943b712072b77c4/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/harikrishnan/coding/personal/portfolio/.wrangler/tmp/pages-nliQli/functionsWorker-0.6202401873468165.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=fehfof02fa.js.map
