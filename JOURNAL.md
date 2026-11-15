# How to publish a post

Posts live in `_posts/`. Each post is one Markdown file named

```
YYYY-MM-DD-short-title.md
```

for example `_posts/2026-11-20-thinking-fast-and-slow.md`. The date in the name is the
post's date; the short title becomes its web address
(`maneshgar.com/journal/2026/thinking-fast-and-slow/`).

## Easiest way: on github.com

1. Open the repository on GitHub, go into the `_posts` folder.
2. Click **Add file → Create new file**, name it as above.
3. Paste the template below, write, and click **Commit changes**.
4. The site updates in about a minute.

## Template

```markdown
---
title: "Your Title"
tags: [news]           # news, ai, projects, books, finance or notes (or several: [books, finance])
description: "One sentence for the post list and link previews."

# News posts that point to another page (optional; shows a link card):
link: https://example.com/the-article
link_source: Where it's from        # e.g. UBC Graduate School
link_title: "Title of that page"
link_label: Read the article        # text on the button

# Project posts only (shows a project card):
project_where: Lab or company name
project_period: 2016 – 2017
project_paper: "Paper title (Venue Year)"   # optional

# Book posts only (delete these lines for other posts):
book_title: "The Book's Title"
book_author: Author Name
rating: 4              # 1-5
cover: /images/journal/my-cover.jpg   # upload the image to images/journal/
---

Your first paragraph (shown as the preview).

<!--more-->

The rest of the post…
```

Drafts can go in a `_drafts/` folder (drafts are never published).

## Adding a new topic

Add a line under `journal_tags:` in `_config.yml`, for example `research: Research`,
then use `tags: [research]` in a post. A filter button appears on the Journal page.

## Previewing on your Mac (optional)

```
bundle exec jekyll serve --drafts
```

then open http://localhost:4000. (Needs Ruby and the `github-pages` gem.)
