# TatagMarinduque

A static, browser-only prototype for a Marinduque micro-enterprise directory, sample wholesale quote requests, and a local sourcing bulletin. Sample makers are fictional and not endorsements, real businesses, or official certifications. Listings added through the form stay in the current browser and are not published or verified.

## Project layout

- `html/` — separate static pages for the home page, directory, maker listing form, bulletin, maker profiles, quote flow, and demo account views.
- `assets/` — locally stored SVG illustrations, sample product photos, and the site mark.
- `data/` — fictional sample vendors and sourcing posts.
- `css/` — shared responsive styling.
- `js/` — client-side rendering, filtering, and browser-only demo interactions.
- `docs/` — project documentation, task log, and manuscript/reference notes.
- `tools/` — a lightweight project structure and JavaScript syntax validator.

## Open the prototype

Open `html/index.html` in a modern browser. All pages are static and use no package manager, Node.js dependencies, database, or API server. Some browsers restrict `localStorage` for pages opened directly from disk; if the browser reports a storage error, use a static-file preview feature such as VS Code Live Server. A static preview only serves these files and does not add a backend.

## Demo workflows

- Search and filter the sample maker directory.
- Create a demo maker listing, optionally with a product photo, that appears in the directory in the current browser.
- Remove a browser-only demo listing from its profile page.
- View maker profiles and preview a sample quote request.
- Add sourcing-board sample posts.
- Create a local demo profile to view the dashboard or sample review queue.
- Mark sample maker records verified or rejected in the current browser.

Changes made in demo forms, including maker listings and resized product photos, are saved in that browser's `localStorage` only. They are not transmitted to another person or device, and may be cleared by the browser. Browser-only maker listings can be removed from their profile pages. The demo profile is not authentication and does not use passwords. Do not enter real personal, account, or business information.

## Boundaries

This static conversion does not include secure accounts, server-side persistence, password handling, email or message delivery, server-side file uploads, production authorization, official DTI review, or deployment. Local sample status changes are not official verification. The previous Next.js/Express/MongoDB application has been retired from this workspace; its unused dependency folders and manifests are not required to run the static prototype.

Sample maker photos are representative and do not depict the fictional sample businesses. The photos are sourced from Wikimedia Commons and Flickr; the links below document their sources, creators, and licenses:

- Uraro cookies: [Oatmeal cookies on a plate](https://commons.wikimedia.org/wiki/File:Oatmeal_cookies_on_a_plate.jpg), Evan Prodromou, CC0 1.0.
- Pottery: [Clay Pot from Liloan 1](https://commons.wikimedia.org/wiki/File:Clay_Pot_from_Liloan_1.jpg), Bim24, CC0 1.0.
- Coconut oil: [Processing and cooking of coconut healing oil in the Philippines 43](https://commons.wikimedia.org/wiki/File:9129Processing_and_cooking_of_coconut_healing_oil_in_the_Philippines_43.jpg), Judgefloro, CC0 1.0.
- Woven baskets: [The Basket Weaving Handicrafts of Manaoag Pangasinan, Philippines](https://commons.wikimedia.org/wiki/File:The_Basket_Weaving_Handicrafts_of_Manaoag_Pangasinan,_Philippines.jpg), Ranieljosecastaneda, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); resized for this site.
- Santa Cruz handicrafts: [Monte de Ramos Handicraft Buntal Talipot](https://commons.wikimedia.org/wiki/File:Santa_Cruz_Marinduque_Monte_de_Ramos_Handicraft_Buntal_TalipotA.jpg), Valenzuela400, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); resized for this site.

Uploaded demo listing photos remain in the current browser. References and citation entries from older drafts are not treated as verified evidence; confirm bibliographic details and project requirements before submission.

## Validation

Run `tools/validate.ps1` in PowerShell to check the required files and verify JavaScript syntax when Node.js is available. The website itself has no runtime dependency on Node.js.
