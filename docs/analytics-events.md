# Analytics (InsightFlare)

Analytics is loaded by the deferred script in `index.html`:

```html
<script defer src="https://analytics.hari.works/script.js?siteId=355582c8-1a4e-4e83-9664-d75efee87183"></script>
```

Custom events use `trackEvent(name, properties)` from `src/utils/analytics.js`, which calls `window.insightflare?.track(name, properties)`. Tracking is a no-op if the script is unavailable; failures never interrupt user actions.

No analytics SDK or environment variables are required. Provider-backed blog view counts remain removed.

Open the site's **Events** page in InsightFlare to see received events; no advance registration is needed. Events before the tracking script becomes available are not queued.

Do not include passwords, contact form contents, or other sensitive information in event properties. Route events omit query strings, and blog events omit referrer URLs.

The contact form currently simulates submission locally; its submitted event reflects that UI flow, not confirmed server delivery.

## Event Names Wired

- `page_viewed`
- `navbar_link_clicked`
- `navbar_connect_clicked`
- `theme_toggled`
- `social_popover_link_clicked`
- `hover_preview_opened`
- `featured_project_link_clicked`
- `home_view_all_projects_clicked`
- `project_modal_opened`
- `project_modal_closed`
- `project_modal_navigated`
- `project_link_clicked`
- `projects_contact_cta_clicked`
- `blog_card_clicked`
- `blog_post_viewed`
- `blog_post_back_clicked`
- `blog_speed_reader_opened`
- `contact_form_submitted`
- `contact_form_submit_failed`
- `contact_social_clicked`
- `contact_quick_action_clicked`
- `footer_social_clicked`
- `footer_nav_clicked`
- `footer_expertise_clicked`
- `footer_policy_clicked`

## Checks

```sh
node --test src/utils/analytics.test.js
npm run build
```
