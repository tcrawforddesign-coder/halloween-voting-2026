# The Midnight Gallery — Halloween 2026

A mobile-friendly Halloween submission gallery made with plain HTML, CSS, and JavaScript. No dependencies or build step.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the site in your browser using your development environment's local server access. You can also open `index.html` directly.

## Customize

- The supplied Microsoft Forms voting form is embedded below the gallery. The two voting buttons open the same form in a new tab as a fallback. To change forms, update `VOTING_FORM_URL` in `script.js`, both voting links, and the iframe URL in `index.html`. Keep `embed=true` on the iframe URL.
- Replace the original SVG placeholder illustrations in `assets/` with submission images. Keep relative image paths, update image descriptions, and edit the matching card details in `index.html`.
- Categories, image enlargement dialogs, keyboard controls, and responsive layouts are included.

Votes are submitted through the embedded Microsoft Form and stored by Microsoft Forms, not in the repository. Form access, sign-in requirements, and response limits are controlled in Microsoft Forms settings. If embedding is restricted by the form owner or a browser, visitors can use the new-tab voting button. A static site cannot securely store votes itself without an external service or backend.
