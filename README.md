# 3Sixty Halloween Contest 2026

Company contest gallery with a Microsoft Forms voting ballot. The site uses plain HTML, CSS, and JavaScript.

The published site lives on the `gh-pages` branch. Keep all asset paths relative so the gallery works under the repository’s GitHub Pages URL.

## Current submissions

| Entry | Description | Contest | Image |
| --- | --- | --- | --- |
| P01 | Hooded pumpkin | 3Sixty Pumpkin Contest | `assets/submissions/pumpkin-p01.jpg` |
| K01 | Striped cat pumpkin | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k01.jpeg` |
| K02 | Pumpkin with a veil | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k02.jpeg` |
| K03 | Pumpkin with seed teeth | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k03.jpg` |

These photos show decorated pumpkins. The entry IDs are internal only (filenames and `data-entry-id`); the page shows each entry by name. The public gallery and asset filenames contain no participant names. The 3Sixty Costume Contest has no entries yet.

## Voting

The ballot section below the gallery has an "Open the ballot" button that opens the Microsoft Form in a new tab. The form isn't embedded, because Microsoft Forms often won't load inside another page (especially when responses are limited to your organization). Microsoft Forms collects the votes; this repository doesn’t store responses.

Keep ballot choices in Microsoft Forms aligned with the entry names shown on the page. Adding a gallery entry doesn’t create a Forms answer option. Manage response limits, dates, and notifications in Forms.

To change ballots, update `VOTING_FORM_URL` in `script.js` and the ballot link in `index.html`.

## Design

Headings use Creepster and body text uses Bricolage Grotesque; both are self-hosted in `assets/fonts` under the SIL Open Font License. The moon, bats, fog, spiderweb and peeking ghost are drawn in `index.html` and `styles.css`. The hero is an animated SVG scene in `index.html`: a flickering jack-o'-lantern that hops (and hops on click) with a floating ghost. All animations are skipped for visitors who prefer reduced motion.

## Local preview

Run `python3 -m http.server 8000` from the repository root, then open the local server in your browser.
