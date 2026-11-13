# TatagMarinduque

A static, browser-only prototype for a Marinduque micro-enterprise directory, sample wholesale quote requests, and a local sourcing bulletin. All makers and records are fictional sample data; they are not endorsements, real businesses, or official certifications.

## Project layout

- `html/` — separate static pages for the home page, directory, bulletin, maker profiles, quote flow, and demo account views.
- `assets/` — locally stored SVG illustrations and the site mark.
- `data/` — fictional sample vendors and sourcing posts.
- `css/` — shared responsive styling.
- `js/` — client-side rendering, filtering, and browser-only demo interactions.
- `docs/` — project documentation, task log, and manuscript/reference notes.
- `tools/` — a lightweight project structure and JavaScript syntax validator.

## Open the prototype

Open `html/index.html` in a modern browser. All pages are static and use no package manager, Node.js dependencies, database, or API server. Some browsers restrict `localStorage` for pages opened directly from disk; if the browser reports a storage error, use a static-file preview feature such as VS Code Live Server. A static preview only serves these files and does not add a backend.

## Demo workflows

- Search and filter the sample maker directory.
- View maker profiles and preview a sample quote request.
- Add sourcing-board sample posts.
- Create a local demo profile to view the dashboard or sample review queue.
- Mark sample maker records verified or rejected in the current browser.

Changes made in demo forms are saved in that browser's `localStorage` only. They are not transmitted to another person or device, and may be cleared by the browser. The demo profile is not authentication and does not use passwords. Do not enter real personal, account, or business information.

## Boundaries

This static conversion does not include secure accounts, server-side persistence, password handling, email or message delivery, file uploads, production authorization, official DTI review, or deployment. Local sample status changes are not official verification. The previous Next.js/Express/MongoDB application has been retired from this workspace; its unused dependency folders and manifests are not required to run the static prototype.

The original external product photographs have been replaced with a locally generated SVG illustration. References and citation entries from older drafts are not treated as verified evidence; confirm bibliographic details and project requirements before submission.

## Validation

Run `tools/validate.ps1` in PowerShell to check the required files and verify JavaScript syntax when Node.js is available. The website itself has no runtime dependency on Node.js.
