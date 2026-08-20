# Yaniv Yacoby 

A single-page academic site plus a small music section, built with
[Jekyll](https://jekyllrb.com/) on top of the [al-folio](https://github.com/alshedivat/al-folio)
theme. 

- The **home page** (`/`) is one long scrolling page built from `_pages/about.md`
  (which uses `_layouts/about.html`). Each section (About, Research, Teaching,
  Advocacy, Music…) is a separate include.
- The **music section** is a Jekyll collection: one file per album in `_music/`,
  rendered at `/music/<name>`.

## Running locally

```bash
bundle install        # first time only
bundle exec jekyll serve
```

Then open <http://localhost:4000>. Saving a content, template, or SCSS file
rebuilds automatically. **Editing `_config.yml` does _not_ — you must stop the
server (Ctrl-C) and run `jekyll serve` again.**

## Where to change things

| To change… | Edit… |
|---|---|
| Cover greeting ("Hey, I'm Yaniv.") | `_pages/about.md` → `greeting:` |
| About blurb + the "Update" callout (e.g. the R01) | `_pages/about.md` (body text + `about_update:`) |
| Research / Teaching / Advocacy section text | `_includes/sections/*.md` |
| Course cards | `_includes/sections/course-*.md` and `courses.html` |
| Advocacy items, performances, contact links | `_data/*.yml` |
| A music album (text, links, embeds) | its file in `_music/*.md` |
| Music album **order** | the `importance:` number in each `_music/*.md` (lower = first) |
| Make an album page light instead of dark | add `light_page: true` to that album's front matter |
| Bio / career diagram (roles, connections) | `assets/js/bio-diagram.js` → the `NODES` and `LINKS` arrays at the top |
| Section background colors | `_sass/_cover.scss` — search for `#about`, `#publications`, etc. |
| Nav bar items | `_includes/onepage-nav.html` |
| Footer credit line | `_config.yml` → `footer_text:` (**restart**) |
| Site title, favicon, analytics IDs | `_config.yml` (**restart**) |

Most day-to-day edits are text in `_pages/`, `_includes/sections/`, `_data/`, or
`_music/` — one obvious file each.

## Sharp Bits

- **`_config.yml` changes need a full restart**, not just a save. If a change
  "isn't taking," this is the first thing to check.
- **CSS is cache-busted, JavaScript is not.** If an edit to a `.js` file (the
  cover scene or bio diagram) doesn't show up, hard-refresh the browser
  (Cmd/Ctrl-Shift-R) or view it in a private tab. (CSS auto-busts via a `?v=`
  query on `main.css`.)
- **Section background colors need contrast.** The saturated section colors are
  tuned so white text passes WCAG AA (~4.5:1). If you change one, re-check it.
- **Chrome (footer/nav) sets its own colors.** Content inherits the theme text
  color; the footer and nav override it. Style text there intentionally rather
  than assuming it inherits.


## Credits

Built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme.
Cover art inspired by [Eiblin Koch](https://eiblinkoch.com).
