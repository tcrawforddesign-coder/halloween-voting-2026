# 3Sixty Halloween Contest 2026

Company contest gallery with a Microsoft Forms voting ballot. The site uses plain HTML, CSS, and JavaScript.

The published site lives on the `gh-pages` branch. Keep all asset paths relative so the gallery works under the repository’s GitHub Pages URL.

## Current submissions

| Entry | Description | Contest | Image |
| --- | --- | --- | --- |
| C01 | Dorothy | 3Sixty Costume Contest | `assets/submissions/costume-c01.jpg` |
| C02 | Medieval knight | 3Sixty Costume Contest | `assets/submissions/costume-c02.jpg` |
| C03 | The Mandalorian | 3Sixty Costume Contest | `assets/submissions/costume-c03.jpg` |
| C04 | Cardinals player | 3Sixty Costume Contest | `assets/submissions/costume-c04.jpg` |
| C05 | Powerpuff Girls family | 3Sixty Costume Contest | `assets/submissions/costume-c05.jpg` |
| P01 | Hooded pumpkin | 3Sixty Pumpkin Contest | `assets/submissions/pumpkin-p01.jpg` |
| P02 | Paper lantern | 3Sixty Pumpkin Contest | `assets/submissions/pumpkin-p02.jpg` |
| P03 | Jack Skellington | 3Sixty Pumpkin Contest | `assets/submissions/pumpkin-p03.jpg` |
| P04 | Baby Yoda | 3Sixty Pumpkin Contest | `assets/submissions/pumpkin-p04.jpg` |
| K01 | Cheshire Cat | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k01.jpeg` |
| K02 | Corpse Bride | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k02.jpeg` |
| K03 | Pumpkin with seed teeth | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k03.jpg` |
| K04 | Cupcake | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k04.jpg` |
| K05 | Pennywise | Kids’ Pumpkin Contest | `assets/submissions/pumpkin-k05.jpg` |

Costume photos are resized and stripped of camera metadata before they are added. The entry IDs are internal only (filenames and `data-entry-id`); the page shows each entry by name. The public gallery and asset filenames contain no participant names.

## Voting

The Microsoft Form is embedded in the ballot section below the gallery (`&embed=true`), with an "Open it in a new tab" link underneath as a fallback. The embed only works when the form is set to "Anyone can respond"; forms limited to your organization need a sign-in that browsers won't show inside another site. Microsoft Forms collects the votes; this repository doesn’t store responses.

Keep ballot choices in Microsoft Forms aligned with the entry names shown on the page. Adding a gallery entry doesn’t create a Forms answer option. Manage response limits, dates, and notifications in Forms.

To change ballots, update `VOTING_FORM_URL` in `script.js`, plus the iframe URL and fallback link in `index.html`. Keep `embed=true` on the iframe.

## Design

Headings use Creepster and body text uses Bricolage Grotesque; both are self-hosted in `assets/fonts` under the SIL Open Font License. The moon, bats, fog, spiderweb and peeking ghost are drawn in `index.html` and `styles.css`. The hero is an animated canvas scene in `hero.js`: friendly ghosts with curling tails drift across the full moon, with clouds, bats, a treeline and rolling fog. All animations are skipped for visitors who prefer reduced motion.

## Local preview

Run `python3 -m http.server 8000` from the repository root, then open the local server in your browser.
