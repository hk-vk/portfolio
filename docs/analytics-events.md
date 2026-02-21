# Analytics Events (PostHog)

## View Counts on Blog Cards

- API route: `GET /api/blog-view-counts`
- Server file: `functions/api/blog-view-counts.js`
- Reads PostHog `blog_post_viewed` events and aggregates by `post_slug`
- Blog card UI file: `src/pages/Blog.jsx`

Required server env:
- `POSTHOG_API_HOST` (for example `https://us.posthog.com`)
- `POSTHOG_PROJECT_ID`
- `POSTHOG_PERSONAL_API_KEY`

## Event Names Wired

- `page_viewed`
- `navbar_link_clicked`
- `navbar_connect_clicked`
- `theme_toggled`
- `social_popover_link_clicked`
- `hover_preview_opened`
- `featured_project_link_clicked`
- `home_view_all_projects_clicked`
- `projects_filter_selected`
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
