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

These photos show decorated pumpkins. Entry numbers identify the submissions; the public gallery and asset filenames contain no participant names. The 3Sixty Costume Contest has no entries yet.

## Voting

The ballot appears below the gallery. Voting buttons open the same Microsoft Form in a new tab. Microsoft Forms collects the votes; this repository doesn’t store responses.

Keep ballot choices in Microsoft Forms aligned with the entry IDs above. Adding a gallery entry doesn’t create a Forms answer option. Manage response limits, dates, and notifications in Forms.

To change ballots, update `VOTING_FORM_URL` in `script.js`, the voting links, and the iframe URL in `index.html`. Keep `embed=true` on the iframe.

## Design

Headings use Creepster and body text uses Bricolage Grotesque; both are self-hosted in `assets/fonts` under the SIL Open Font License. The moon, bats, fog, spiderweb and peeking ghost are drawn in `index.html` and `styles.css`. The hero fans out the entry photos from `assets/submissions`; if entries change, update the four `fan` images in `index.html`. The bats, ghost, spider and fan-in animations are skipped for visitors who prefer reduced motion.

## Local preview

Run `python3 -m http.server 8000` from the repository root, then open the local server in your browser.
