# TatagMarinduque

A static, browser-only prototype for a Marinduque micro-enterprise directory, sample wholesale quote requests, maker-buyer messaging, and a local sourcing bulletin. Sample makers are fictional and not endorsements, real businesses, or official certifications. Listings added through the form stay in the current browser and are not published or verified.

## Project layout

- `html/` — separate static pages for the home page, directory, maker listing form, bulletin, maker profiles, quote flow, messaging, demo account settings, and the admin workspace.
- `assets/` — locally stored SVG illustrations, sample product photos, and the site mark.
- `data/` — fictional sample vendors and sourcing posts.
- `css/` — shared responsive styling.
- `js/` — client-side rendering, filtering, and browser-only demo interactions.
- `docs/` — project documentation, task log, and manuscript/reference notes.
- `tools/` — a lightweight project structure and JavaScript syntax validator.

## Open the prototype

Open `html/index.html` in a modern browser. All pages are static and use no package manager, Node.js dependencies, database, or API server. Some browsers restrict `localStorage` for pages opened directly from disk; if the browser reports a storage error, use a static-file preview feature such as VS Code Live Server. A static preview only serves these files and does not add a backend.

## Demo workflows

- Open the collapsible navigation menu to move between makers, listings, messages, account, sourcing, and about pages.
- Switch the interface between English and Filipino using the language button on each page; the choice is saved in this browser.
- Sign in or create a demo profile before creating or editing a maker listing.
- Search and filter the sample maker directory.
- View fictional contact names, emails, and phone numbers on sample maker profiles.
- View fictional certification labels on sample maker profiles.
- Create a demo maker listing, optionally with a product photo, that appears in the directory in the current browser.
- Edit or remove a browser-only demo listing from its profile page.
- Sign in with the configured Admin email to view reports, verify pending sample makers, and edit or delete profiles in this browser.
- Sign in or create a demo profile before requesting a sample quote or opening messages.
- Sign in or create a demo profile before reporting a maker from its profile.
- Open a maker conversation and preview buyer/maker text exchanges saved only in the current browser after signing in.
- Add sourcing-board sample posts.
- Create a local demo profile to view the dashboard or sample review queue.
- Edit the demo profile name, email, and role on the account settings page, or log out.
- See a default avatar and account link in the home-page header while signed in.
- Use the demo review queue to mark sample records verified or rejected in the current browser.

Changes made in demo forms, including maker listings, reports, account profile settings, resized product photos, and the language preference, are saved in that browser's `localStorage` only. They are not transmitted to another person or device, and may be cleared by the browser. Maker names and product details are displayed as entered; the Filipino option translates the interface. Browser-only maker listings can be edited or removed from their profile pages. The demo profile is not authentication and does not use passwords. Do not enter real personal, account, or business information.

## Boundaries

This static conversion does not include secure accounts, server-side persistence, password handling, email or message delivery, report delivery or review, server-side file uploads, production authorization, official DTI review, or deployment. Admin access is determined by a client-side email comparison, not secure authentication; maker edits and deletions affect this browser only. Messaging is a same-browser preview only; it does not reach makers or buyers on other devices. Maker reports are saved in the current browser only and are not sent to an administrator. Sample maker contact details are fictional and non-routable; they cannot be used to reach a maker. Sample certifications are invented demo labels, not real or verified credentials. New browser-only listings do not receive fabricated contact details or certifications. Local sample status changes are not official verification. The previous Next.js/Express/MongoDB application has been retired from this workspace; its unused dependency folders and manifests are not required to run the static prototype.

Sample maker photos are representative and do not depict the fictional sample businesses. The photos are sourced from Wikimedia Commons and Flickr; the links below document their sources, creators, and licenses:

- Uraro cookies: [Oatmeal cookies on a plate](https://commons.wikimedia.org/wiki/File:Oatmeal_cookies_on_a_plate.jpg), Evan Prodromou, CC0 1.0.
- Pottery: [Clay Pot from Liloan 1](https://commons.wikimedia.org/wiki/File:Clay_Pot_from_Liloan_1.jpg), Bim24, CC0 1.0.
- Coconut oil: [Processing and cooking of coconut healing oil in the Philippines 43](https://commons.wikimedia.org/wiki/File:9129Processing_and_cooking_of_coconut_healing_oil_in_the_Philippines_43.jpg), Judgefloro, CC0 1.0.
- Woven baskets: [The Basket Weaving Handicrafts of Manaoag Pangasinan, Philippines](https://commons.wikimedia.org/wiki/File:The_Basket_Weaving_Handicrafts_of_Manaoag_Pangasinan,_Philippines.jpg), Ranieljosecastaneda, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); resized for this site.
- Santa Cruz handicrafts: [Monte de Ramos Handicraft Buntal Talipot](https://commons.wikimedia.org/wiki/File:Santa_Cruz_Marinduque_Monte_de_Ramos_Handicraft_Buntal_TalipotA.jpg), Valenzuela400, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); resized for this site.

Uploaded demo listing photos remain in the current browser. References and citation entries from older drafts are not treated as verified evidence; confirm bibliographic details and project requirements before submission.

## Validation

Run `tools/validate.ps1` in PowerShell to check the required files and verify JavaScript syntax when Node.js is available. The website itself has no runtime dependency on Node.js.
