(function () {
  "use strict";

  const app = document.getElementById("app");
  const data = window.TatagData;
  const ADMIN_EMAIL = "admin12@gmail.com";
  const STORAGE = {
    user: "tatag-demo-user",
    vendors: "tatag-demo-vendors",
    posts: "tatag-demo-posts",
    quotes: "tatag-demo-quotes",
    messages: "tatag-demo-messages",
    reports: "tatag-demo-reports",
    vendorOverrides: "tatag-demo-vendor-overrides",
    deletedVendors: "tatag-demo-deleted-vendors",
    statuses: "tatag-demo-vendor-statuses",
    language: "tatag-demo-language"
  };
  const page = document.body.dataset.page;
  const originalPageTitle = document.title;
  let currentLanguage = "en";
  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();
  const filipinoTranslations = {
    "Language": "Wika",
    "Switch language": "Palitan ang wika",
    "Main navigation": "Pangunahing nabigasyon",
    "Site menu": "Menu ng site",
    "Open navigation": "Buksan ang nabigasyon",
    "Close navigation": "Isara ang nabigasyon",
    "Filter by category": "I-filter ayon sa kategorya",
    "Maker conversations": "Mga usapan sa mga gumagawa",
    "TatagMarinduque home": "Home ng TatagMarinduque",
    "Sign in": "Mag-sign in",
    "Sign in with email": "Mag-sign in gamit ang email",
    "Sign in to continue.": "Mag-sign in upang magpatuloy.",
    "Sign in or create a demo profile to access messages and sample quote requests.": "Mag-sign in o gumawa ng demo profile upang ma-access ang mga mensahe at humiling ng sample na presyo.",
    "You need an account to access": "Kailangan mo ng account upang ma-access ito",
    "Create a demo profile": "Gumawa ng demo profile",
    "Find makers": "Maghanap ng mga gumagawa",
    "List your business": "Ilista ang iyong negosyo",
    "Messages": "Mga mensahe",
    "Account": "Account",
    "Sourcing board": "Pamilihan ng materyales",
    "About": "Tungkol dito",
    "Admin": "Admin",
    "My account": "Aking account",
    "Prototype · browser-only demo": "Prototype · demo sa browser lamang",
    "TatagMarinduque | Local enterprise, connected": "TatagMarinduque | Magkakaugnay na lokal na negosyo",
    "Find makers | TatagMarinduque": "Maghanap ng mga gumagawa | TatagMarinduque",
    "Sourcing board | TatagMarinduque": "Pamilihan ng materyales | TatagMarinduque",
    "About | TatagMarinduque": "Tungkol dito | TatagMarinduque",
    "Sign in | TatagMarinduque": "Mag-sign in | TatagMarinduque",
    "Join the directory | TatagMarinduque": "Sumali sa direktoryo | TatagMarinduque",
    "List your business | TatagMarinduque": "Ilista ang iyong negosyo | TatagMarinduque",
    "Maker profile | TatagMarinduque": "Profile ng gumagawa | TatagMarinduque",
    "Request a sample quote | TatagMarinduque": "Humiling ng sample na presyo | TatagMarinduque",
    "Messages | TatagMarinduque": "Mga mensahe | TatagMarinduque",
    "Maker dashboard | TatagMarinduque": "Dashboard ng gumagawa | TatagMarinduque",
    "Account settings | TatagMarinduque": "Mga setting ng account | TatagMarinduque",
    "Admin workspace | TatagMarinduque": "Workspace ng admin | TatagMarinduque",
    "Review queue | TatagMarinduque": "Pila ng pagsusuri | TatagMarinduque",
    "A LOCAL TRADE DIRECTORY": "ISANG LOKAL NA DIREKTORYO NG KALAKALAN",
    "Made here.": "Ginawa rito.",
    "Ready to go further.": "Handang umunlad.",
    "Meet the makers of Marinduque. Find products, connect with local producers, and build your next order together.": "Kilalanin ang mga gumagawa sa Marinduque. Maghanap ng mga produkto, makipag-ugnayan sa mga lokal na prodyuser, at buuin ang susunod mong order.",
    "Try uraro cookies, pottery, or a town": "Subukan: uraro cookies, palayok, o pangalan ng bayan",
    "FOOD & CRAFT": "PAGKAIN AT GAWA-KAMAY",
    "FOOD": "PAGKAIN",
    "CRAFTS": "GAWA-KAMAY",
    "MADE IN MARINDUQUE": "GINAWA SA MARINDUQUE",
    "DIRECT CONNECTIONS": "DIREKTANG UGNAYAN",
    "Illustration of locally made goods": "Guhit ng mga produktong lokal",
    "SAMPLE GOODS · ISLAND-MADE CONCEPT": "MGA SAMPLE NA PRODUKTO · KONSEPTONG GAWA SA ISLA",
    "Find island-made goods": "Maghanap ng mga produktong gawa sa isla",
    "Request a sample quote": "Humiling ng sample na presyo",
    "Source materials together": "Magtulungan sa paghahanap ng mga materyales",
    "A directory for local trade": "Direktoryo para sa lokal na kalakalan",
    "Marketplace concept": "Konsepto ng pamilihan",
    "THE MAKER DIRECTORY": "DIREKTORYO NG MGA GUMAGAWA",
    "MAKER DIRECTORY": "DIREKTORYO NG MGA GUMAGAWA",
    "Good things start": "Nagsisimula ang magagandang bagay",
    "with a": "sa pamamagitan ng",
    "connection.": "ugnayan.",
    "Browse sample makers across the island or add a browser-only demo listing for your business.": "Tingnan ang mga sample na gumagawa sa buong isla o magdagdag ng demo listing ng negosyo sa browser na ito.",
    "Search makers": "Maghanap ng mga gumagawa",
    "Search products, makers, or towns": "Maghanap ng produkto, gumagawa, o bayan",
    "All makers": "Lahat ng gumagawa",
    "Food": "Pagkain",
    "Crafts": "Gawa-kamay",
    "DTI-verified samples only": "Mga sample na beripikado ng DTI lamang",
    "Sample makers are fictional. Photos are representative and may not depict their products. New demo listings stay in this browser and are not verified.": "Kathang-isip ang mga sample na gumagawa. Halimbawa lamang ang mga larawan at maaaring hindi tumugma sa kanilang mga produkto. Nananatili sa browser na ito ang mga bagong demo listing at hindi beripikado.",
    "THE SOURCING BOARD": "PAMILIHAN NG MATERYALES",
    "Find what you need.": "Hanapin ang kailangan mo.",
    "Share what you have.": "Ibahagi ang mayroon ka.",
    "A sample board for local makers to share materials they need or have available.": "Sample na board para magbahagi ang mga lokal na gumagawa ng mga materyales na kailangan o mayroon sila.",
    "Explore the board": "Tingnan ang board",
    "No makers found.": "Walang nahanap na gumagawa.",
    "Try a different search or filter.": "Subukan ang ibang paghahanap o filter.",
    "View maker": "Tingnan ang gumagawa",
    "View your listing": "Tingnan ang iyong listing",
    "Available capacity": "Kapasidad na magagamit",
    "Verified sample": "Sample na na-verify",
    "Pending sample": "Naghihintay na sample",
    "Rejected sample": "Tinanggihang sample",
    "Pending demo listing": "Naghihintay na demo listing",
    "Find your next": "Hanapin ang susunod mong",
    "local supplier.": "lokal na supplier.",
    "Browse island makers and start a direct wholesale conversation. You can also add a browser-only demo listing.": "Tingnan ang mga gumagawa sa isla at direktang makipag-usap tungkol sa maramihang pagbili. Maaari ka ring magdagdag ng demo listing sa browser.",
    "Request a quote": "Humiling ng presyo",
    "Browse makers": "Tingnan ang mga gumagawa",
    "The maker directory": "Direktoryo ng mga gumagawa",
    "Connect with sample local producers and suppliers for the materials behind island-made goods.": "Makipag-ugnayan sa mga lokal na prodyuser at supplier para sa mga materyales ng mga produktong gawa sa isla.",
    "Add a post ↓": "Magdagdag ng post ↓",
    "Filter sourcing posts": "I-filter ang mga post sa materyales",
    "All posts": "Lahat ng post",
    "Need": "Kailangan",
    "Supply": "Mayroon",
    "Sample posts are for demonstration only. Contact details are not included.": "Para lamang sa demonstrasyon ang mga sample na post. Walang kasamang detalye sa pakikipag-ugnayan.",
    "ADD TO THE BOARD": "IDAGDAG SA BOARD",
    "Post a need": "I-post ang kailangan",
    "or a supply.": "o ang maiaalok.",
    "What are you posting?": "Ano ang ipo-post mo?",
    "Material": "Materyal",
    "Amount": "Dami",
    "Town": "Bayan",
    "For example, arrowroot starch": "Halimbawa: arina ng uraro",
    "How much is needed or available?": "Gaano karami ang kailangan o mayroon?",
    "Where are you based?": "Saan ka matatagpuan?",
    "Add sample post": "Magdagdag ng sample na post",
    "Saved only in this browser. No post is sent to a server.": "Sa browser na ito lamang ise-save. Walang post na ipapadala sa server.",
    "No posts in this view.": "Walang post sa view na ito.",
    "Try another filter.": "Subukan ang ibang filter.",
    "Added to the board in this browser only.": "Idinagdag sa board sa browser na ito lamang.",
    "ABOUT THIS PROJECT": "TUNGKOL SA PROYEKTONG ITO",
    "Local enterprise,": "Lokal na negosyo,",
    "connected.": "magkakaugnay.",
    "TatagMarinduque is a project concept for a digital directory and trade platform connecting the island’s micro-enterprises with buyers and each other. This simplified version is a static website; its sample interactions stay in your browser.": "Konsepto ang TatagMarinduque para sa digital na direktoryo at plataporma ng kalakalan na nag-uugnay sa maliliit na negosyo ng isla, mga mamimili, at isa't isa. Static na website ang pinasimpleng bersyong ito; nananatili sa browser ang mga sample na interaction.",
    "01 / THE CHALLENGE": "01 / ANG HAMON",
    "More than a listing.": "Higit pa sa listing.",
    "Local makers need a simple way to show what they produce, share capacity, hear from wholesale buyers, and find the materials that keep their work moving.": "Kailangan ng mga lokal na gumagawa ng simpleng paraan upang ipakita ang kanilang produkto at kapasidad, makatanggap ng mensahe mula sa mga mamimiling maramihan, at makahanap ng mga materyales para sa kanilang trabaho.",
    "02 / THE RESPONSE": "02 / ANG SOLUSYON",
    "Made for local trade.": "Para sa lokal na kalakalan.",
    "The concept brings a searchable maker directory, a sample quote request flow, and a shared raw-material sourcing board into one place.": "Pinagsasama ng konsepto ang nahahanap na direktoryo ng mga gumagawa, sample na proseso ng paghiling ng presyo, at board para sa paghahanap ng hilaw na materyales.",
    "03 / THE BOUNDARY": "03 / MGA LIMITASYON",
    "A browser-only prototype.": "Prototype na sa browser lamang.",
    "There is no account service, database, official verification, or message delivery. Never enter real personal or business information.": "Walang serbisyo ng account, database, opisyal na beripikasyon, o pagpapadala ng mensahe. Huwag maglagay ng totoong personal o pang-negosyong impormasyon.",
    "PROJECT REFERENCES & CREDITS": "MGA SANGGUNIAN AT PASASALAMAT",
    "The previous project draft contained citation entries whose bibliographic details were marked for verification. They have not been treated as verified evidence in this static conversion. See": "May mga citation sa naunang draft ng proyekto na kailangan pang beripikahin. Hindi itinuring na beripikadong ebidensya ang mga ito sa static na bersyong ito. Tingnan ang",
    "the project manuscript and references notes": "mga tala sa manuskrito at sanggunian ng proyekto",
    "Original product photographs were replaced with a locally generated illustration. No external image service is required.": "Pinalitan ng larawang ginawa para sa proyekto ang mga orihinal na litrato ng produkto. Walang kinakailangang panlabas na serbisyo ng larawan.",
    "Create a maker": "Gumawa ng",
    "listing.": "listing.",
    "Edit your maker": "I-edit ang iyong",
    "Update your browser-only demo listing. Changes stay in this browser.": "I-update ang demo listing mo na nasa browser lamang. Dito lang sa browser mase-save ang mga pagbabago.",
    "Add your products, capacity, and an optional photo to the local demo directory. This form does not publish information online.": "Idagdag ang iyong mga produkto, kapasidad, at opsyonal na larawan sa lokal na demo directory. Hindi ipo-post online ang impormasyong ito.",
    "Business or maker name": "Pangalan ng negosyo o gumagawa",
    "Choose a town": "Pumili ng bayan",
    "Category": "Kategorya",
    "Choose a category": "Pumili ng kategorya",
    "Product": "Produkto",
    "What do you make or sell?": "Ano ang ginagawa o ibinebenta mo?",
    "Description": "Paglalarawan",
    "Briefly describe your products": "Ilarawan nang maikli ang iyong mga produkto",
    "For example, 40 pieces per month": "Halimbawa: 40 piraso bawat buwan",
    "Product photo (optional)": "Larawan ng produkto (opsyonal)",
    "Upload a replacement or leave empty to keep the current photo.": "Mag-upload ng pamalit o iwanang blangko upang panatilihin ang kasalukuyang larawan.",
    "JPG, PNG, or WebP up to 8 MB. Resized before saving in this browser.": "JPG, PNG, o WebP na hanggang 8 MB. Babaguhin ang laki bago i-save sa browser na ito.",
    "Selected product photo preview": "Preview ng napiling larawan ng produkto",
    "This image could not be opened.": "Hindi mabuksan ang larawang ito.",
    "This browser could not process the image.": "Hindi maproseso ng browser na ito ang larawan.",
    "Save listing changes": "I-save ang mga pagbabago sa listing",
    "Save demo listing": "I-save ang demo listing",
    "Saved only in this browser. It will not be published or shared with other visitors.": "Sa browser na ito lamang ise-save. Hindi ito ipo-post o ibabahagi sa ibang bisita.",
    "DEMO ONLY": "DEMO LAMANG",
    "Not published.": "Hindi ipo-post.",
    "Your listing and photo stay in this browser and appear only in its local directory. New listings are pending and unverified. Do not enter sensitive personal or business information.": "Mananatili sa browser na ito ang listing at larawan mo at dito lamang makikita sa lokal na direktoryo. Naghihintay at hindi beripikado ang mga bagong listing. Huwag maglagay ng sensitibong personal o pang-negosyong impormasyon.",
    "Choose a JPG, PNG, or WebP image.": "Pumili ng JPG, PNG, o WebP na larawan.",
    "Choose an image smaller than 8 MB.": "Pumili ng larawang mas maliit sa 8 MB.",
    "Updated in this browser only.": "Na-update sa browser na ito lamang.",
    "Saved in this browser only.": "Na-save sa browser na ito lamang.",
    "Listing unavailable.": "Hindi available ang listing.",
    "ACCOUNT REQUIRED": "KAILANGAN NG ACCOUNT",
    "Sign in to list your business.": "Mag-sign in upang mailista ang iyong negosyo.",
    "Sign in or create a demo profile to list a business. Your listing is saved only in this browser.": "Mag-sign in o gumawa ng demo profile upang maglista ng negosyo. Sa browser na ito lamang ise-save ang iyong listing.",
    "This listing cannot be edited from this browser account. Browse the directory to find an available listing.": "Hindi mai-edit ang listing na ito gamit ang account sa browser na ito. Tingnan ang direktoryo para makahanap ng available na listing.",
    "Create a demo profile.": "Gumawa ng demo profile.",
    "Sign in with email.": "Mag-sign in gamit ang email.",
    "JOIN THE DIRECTORY": "SUMALI SA DIREKTORYO",
    "WELCOME BACK": "MALIGAYANG PAGBABALIK",
    "This is a local-only demo. It does not create a secure account or send data anywhere.": "Demo lamang ito sa browser na ito. Hindi ito gumagawa ng secure na account o nagpapadala ng data.",
    "Your name": "Pangalan mo",
    "Email address": "Email address",
    "Demo role": "Papel sa demo",
    "Buyer": "Mamimili",
    "Maker / vendor": "Gumagawa / nagtitinda",
    "Reviewer (demo only)": "Tagasuri (demo lamang)",
    "Create demo profile": "Gumawa ng demo profile",
    "Email-only local demo; no password or email verification is used. Do not enter real personal or sensitive information.": "Email lamang ang ginagamit sa demo na ito; walang password o beripikasyon ng email. Huwag maglagay ng totoong personal o sensitibong impormasyon.",
    "Already set up this browser?": "May profile ka na sa browser na ito?",
    "New to TatagMarinduque?": "Bago ka sa TatagMarinduque?",
    "← Back to home": "← Bumalik sa home",
    "This demo browser has a different profile saved. Use the same email or sign out first.": "May ibang profile na naka-save sa browser na ito. Gamitin ang parehong email o mag-sign out muna.",
    "This demo listing is no longer available.": "Hindi na available ang demo listing na ito.",
    "This maker profile is no longer available.": "Hindi na available ang profile ng gumagawa na ito.",
    "This listing was not found in this browser.": "Hindi makita ang listing na ito sa browser na ito.",
    "Profile not found.": "Hindi makita ang profile.",
    "This sample profile is not available. Browse the directory for available makers.": "Hindi available ang sample profile na ito. Tingnan ang direktoryo para sa mga available na gumagawa.",
    "MAKER PROFILE": "PROFILE NG GUMAGAWA",
    "Edit listing": "I-edit ang listing",
    "Remove this listing": "Alisin ang listing na ito",
    "Delete this demo listing and its photo from this browser?": "Burahin ang demo listing na ito at larawan nito sa browser na ito?",
    "Keep listing": "Panatilihin ang listing",
    "Delete listing": "Burahin ang listing",
    "Report maker": "I-report ang gumagawa",
    "You need an account to report": "Kailangan mo ng account upang mag-report",
    "Choose the closest reason. Please do not include sensitive personal information.": "Piliin ang pinakamalapit na dahilan. Huwag magsama ng sensitibong personal na impormasyon.",
    "Reason": "Dahilan",
    "Choose a reason": "Pumili ng dahilan",
    "False advertisement": "Maling pag-aanunsyo",
    "Toxic / rude behavior": "Mapanakit o bastos na asal",
    "Scamming": "Panloloko",
    "Spam or repeated unwanted contact": "Spam o paulit-ulit na hindi hinihinging mensahe",
    "Harassment or threats": "Pangha-harass o pagbabanta",
    "Inappropriate or abusive content": "Hindi angkop o mapanakit na nilalaman",
    "Other": "Iba pa",
    "Additional details (optional)": "Karagdagang detalye (opsyonal)",
    "Add context to help explain your report": "Magbigay ng konteksto upang ipaliwanag ang iyong report",
    "Submit report": "Ipadala ang report",
    "Prototype only: reports are saved in this browser and are not sent for review.": "Prototype lamang: sa browser na ito lang ise-save ang mga report at hindi ipapadala para suriin.",
    "Text this maker": "I-message ang gumagawa",
    "Quote requests are only shown for verified sample makers.": "Para lamang sa mga na-verify na sample na gumagawa ang mga kahilingan sa presyo.",
    "Browser-only demo listing. Not published or verified.": "Demo listing sa browser lamang. Hindi ipo-post o beripikado.",
    "Fictional sample profile. Representative photo; not a real business or official verification.": "Kathang-isip na sample profile. Halimbawa lamang ang larawan; hindi ito totoong negosyo o opisyal na beripikasyon.",
    "Not provided in this demo listing": "Hindi ibinigay sa demo listing na ito",
    "Fictional contact details only; they cannot be used to reach a maker.": "Kathang-isip lamang ang mga detalye sa pakikipag-ugnayan; hindi ito magagamit upang makontak ang gumagawa.",
    "Fictional demo credentials only; none have been issued or verified.": "Kathang-isip lamang ang mga kredensyal sa demo; walang inisyu o beripikado.",
    "CONTACT": "PAKIKIPAG-UGNAYAN",
    "EMAIL": "EMAIL",
    "PHONE": "TELEPONO",
    "PRODUCT": "PRODUKTO",
    "CAPACITY": "KAPASIDAD",
    "CERTIFICATIONS": "MGA SERTIPIKASYON",
    "CERTIFICATION": "SERTIPIKASYON",
    "No makers to message.": "Walang gumagawang maaaring i-message.",
    "Browse the directory to find a maker.": "Tingnan ang direktoryo upang makahanap ng gumagawa.",
    "BUYER & MAKER MESSAGES": "MGA MENSAHE NG MAMIMILI AT GUMAGAWA",
    "Keep the conversation": "Ipagpatuloy ang usapan",
    "moving.": "ninyo.",
    "Choose a maker and exchange sample messages about products, availability, or an order.": "Pumili ng gumagawa at magpalitan ng sample na mensahe tungkol sa produkto, availability, o order.",
    "Conversations": "Mga usapan",
    "Preview as": "I-preview bilang",
    "Maker": "Gumagawa",
    "No messages yet. Send a note to start the conversation.": "Wala pang mensahe. Magpadala ng mensahe upang simulan ang usapan.",
    "Write a message": "Sumulat ng mensahe",
    "Write a message…": "Sumulat ng mensahe…",
    "Send message": "Ipadala ang mensahe",
    "Prototype only: messages are saved in this browser and are not delivered to another person or device. Use fictional details only.": "Prototype lamang: sa browser na ito lang ise-save ang mga mensahe at hindi ipapadala sa ibang tao o device. Gumamit lamang ng kathang-isip na detalye.",
    "messages are saved in this browser and are not delivered to another person or device. Use fictional details only.": "Sa browser na ito lang ise-save ang mga mensahe at hindi ipapadala sa ibang tao o device. Gumamit lamang ng kathang-isip na detalye.",
    "Quote request unavailable.": "Hindi available ang kahilingan sa presyo.",
    "Choose an available verified sample maker from the directory.": "Pumili ng available at na-verify na sample na gumagawa mula sa direktoryo.",
    "SAMPLE QUOTE REQUEST": "SAMPLE NA KAHILINGAN SA PRESYO",
    "Start a conversation.": "Simulan ang usapan.",
    "This preview is saved in this browser only. It will not be sent to the maker.": "Sa browser na ito lamang ise-save ang preview. Hindi ito ipapadala sa gumagawa.",
    "Quantity requested": "Dami na hinihiling",
    "For example, 20 boxes": "Halimbawa: 20 kahon",
    "Message": "Mensahe",
    "Optional details": "Opsyonal na detalye",
    "Save sample request": "I-save ang sample na kahilingan",
    "BEFORE YOU CONTINUE": "BAGO MAGPATULOY",
    "Demo only.": "Demo lamang.",
    "Demo only:": "Demo lamang:",
    "No message or contact information is transmitted. Do not enter real personal information. Sample makers are fictional.": "Walang mensahe o detalye sa pakikipag-ugnayan na ipapadala. Huwag maglagay ng totoong personal na impormasyon. Kathang-isip ang mga sample na gumagawa.",
    "MAKER DASHBOARD": "DASHBOARD NG GUMAGAWA",
    "Set up a demo profile.": "Mag-set up ng demo profile.",
    "Sign in to this browser demo to see locally saved sample quote requests.": "Mag-sign in sa demo na ito upang makita ang mga sample na kahilingan sa presyo na naka-save sa browser.",
    "BROWSER-ONLY DASHBOARD": "DASHBOARD SA BROWSER LAMANG",
    "Hello,": "Kumusta,",
    "Sign out": "Mag-sign out",
    "Demo profile": "Demo profile",
    "Name": "Pangalan",
    "Email": "Email",
    "Role": "Papel",
    "buyer": "mamimili",
    "vendor": "gumagawa/nagtitinda",
    "officer": "tagasuri",
    "admin": "admin",
    "This profile is stored only in this browser and is not protected by a real login.": "Sa browser na ito lamang naka-save ang profile at hindi ito protektado ng tunay na pag-login.",
    "Manage account": "Pamahalaan ang account",
    "Sample quote requests": "Mga sample na kahilingan sa presyo",
    "No quote requests saved in this browser yet.": "Wala pang kahilingan sa presyo na naka-save sa browser na ito.",
    "Browse sample makers": "Tingnan ang mga sample na gumagawa",
    "Browse sample makers →": "Tingnan ang mga sample na gumagawa →",
    "Manage account →": "Pamahalaan ang account →",
    "Do not use this prototype to store real personal or business information.": "Huwag gamitin ang prototype na ito upang mag-imbak ng totoong personal o pang-negosyong impormasyon.",
    "DEMO ACCOUNT": "DEMO ACCOUNT",
    "Sign in or create a demo profile to manage your details in this browser.": "Mag-sign in o gumawa ng demo profile upang pamahalaan ang iyong mga detalye sa browser na ito.",
    "Create profile": "Gumawa ng profile",
    "Account role": "Papel sa account",
    "Admin (email login)": "Admin (pag-login gamit ang email)",
    "Account settings.": "Mga setting ng account.",
    "settings.": "mga setting.",
    "Edit the profile saved for this browser. Changes are local to this device.": "I-edit ang profile na naka-save sa browser na ito. Dito lamang sa device na ito ang mga pagbabago.",
    "Log out": "Mag-log out",
    "Default profile picture": "Default na larawan sa profile",
    "Save account changes": "I-save ang mga pagbabago sa account",
    "LOCAL DEMO ONLY": "LOKAL NA DEMO LAMANG",
    "Not a secure account.": "Hindi secure na account.",
    "This profile is stored in this browser only. It has no password and cannot be used to sign in on another device. Do not enter real personal information.": "Sa browser na ito lamang naka-save ang profile. Wala itong password at hindi ito magagamit upang mag-sign in sa ibang device. Huwag maglagay ng totoong personal na impormasyon.",
    "ADMIN WORKSPACE": "WORKSPACE NG ADMIN",
    "Admin email login required.": "Kailangan mag-sign in gamit ang email ng admin.",
    "Sign in with the configured Admin email to open the local management tools. This prototype does not provide secure authentication.": "Mag-sign in gamit ang itinakdang email ng admin upang buksan ang mga lokal na tool sa pamamahala. Hindi nagbibigay ng secure na pagpapatotoo ang prototype na ito.",
    "BROWSER-ONLY ADMIN": "ADMIN SA BROWSER LAMANG",
    "Manage the": "Pamahalaan ang",
    "directory.": "direktoryo.",
    "Review reports, edit maker listings, or remove profiles from this browser’s demo directory.": "Suriin ang mga report, i-edit ang listing ng gumagawa, o alisin ang mga profile sa demo directory ng browser na ito.",
    "Demo only: admin access is not secure. Changes are local to this browser and are not sent to makers or a moderation team.": "Demo lamang: hindi secure ang access ng admin. Sa browser na ito lamang ang mga pagbabago at hindi ipinapadala sa mga gumagawa o pangkat ng tagasuri.",
    "admin access is not secure. Changes are local to this browser and are not sent to makers or a moderation team.": "Hindi secure ang access ng admin. Sa browser na ito lamang ang mga pagbabago at hindi ipinapadala sa mga gumagawa o pangkat ng tagasuri.",
    "User reports": "Mga report ng user",
    "No reports yet.": "Wala pang mga report.",
    "Maker reports saved in this browser will appear here.": "Lalabas dito ang mga report tungkol sa gumagawa na naka-save sa browser na ito.",
    "Uncategorized report": "Report na walang kategorya",
    "Unknown maker": "Hindi kilalang gumagawa",
    "The maker profile has been deleted.": "Nabura na ang profile ng gumagawa.",
    "Maker profiles": "Mga profile ng gumagawa",
    "No maker profiles.": "Walang profile ng gumagawa.",
    "The directory is empty in this browser.": "Walang laman ang direktoryo sa browser na ito.",
    "Edit profile": "I-edit ang profile",
    "Mark sample verified": "Markahang na-verify ang sample",
    "Delete profile": "Burahin ang profile",
    "This pending sample is no longer available.": "Hindi na available ang nakabinbing sample na ito.",
    "Sample marked verified in this browser only.": "Minarkahang na-verify ang sample sa browser na ito lamang.",
    "Maker profile deleted from this browser only.": "Binura ang profile ng gumagawa sa browser na ito lamang.",
    "DEMO REVIEW QUEUE": "PILA NG DEMO REVIEW",
    "Reviewer profile required.": "Kailangan ng profile ng tagasuri.",
    "Choose the reviewer role on the demo registration page. This is not an official verification tool.": "Piliin ang papel na tagasuri sa demo registration page. Hindi ito opisyal na tool ng beripikasyon.",
    "Create reviewer demo profile": "Gumawa ng demo profile ng tagasuri",
    "Review maker": "Suriin ang mga",
    "profiles.": "profile.",
    "This control changes only the sample status in this browser. It is not an official decision.": "Binabago lamang ng kontrol na ito ang status ng sample sa browser na ito. Hindi ito opisyal na pasya.",
    "Reject sample": "Tanggihan ang sample",
    "All caught up.": "Wala nang nakabinbin.",
    "No pending sample profiles to review.": "Walang nakabinbing sample profile na susuriin.",
    "Sample status updated in this browser only.": "Na-update ang status ng sample sa browser na ito lamang.",
    "Demo reviewer only. No DTI decision or certification is represented.": "Demo tagasuri lamang. Hindi ito kumakatawan sa pasya o sertipikasyon ng DTI.",
    "Prototype only:": "Prototype lamang:",
    "Search": "Maghanap",
    "Account settings saved in this browser.": "Na-save sa browser na ito ang mga setting ng account.",
    "Report saved in this browser only. It has not been sent for review.": "Sa browser na ito lamang na-save ang report. Hindi ito ipinadala para suriin.",
    "Pending sample profiles to review.": "Mga nakabinbing sample profile na susuriin."
  };
  function translateLanguageText(text) {
    if (currentLanguage !== "fil") return text;
    if (Object.prototype.hasOwnProperty.call(filipinoTranslations, text)) {
      return filipinoTranslations[text];
    }

    const roleValue = text.match(/^· (buyer|vendor|officer|admin)$/);
    if (roleValue) return "· " + filipinoTranslations[roleValue[1]];
    const makerCount = text.match(/^(\d+) makers?$/);
    if (makerCount) return makerCount[1] + (makerCount[1] === "1" ? " gumagawa" : " na gumagawa");
    const postCount = text.match(/^(\d+) posts?$/);
    if (postCount) return postCount[1] + " na post";

    const dynamicTranslations = [
      [/^Could not save your listing: /, "Hindi ma-save ang listing mo: "],
      [/^Could not save this post: /, "Hindi ma-save ang post na ito: "],
      [/^Could not save this report: /, "Hindi ma-save ang report na ito: "],
      [/^Could not save this message: /, "Hindi ma-save ang mensaheng ito: "],
      [/^Could not save the sample request: /, "Hindi ma-save ang sample na kahilingan: "],
      [/^Could not save the demo profile: /, "Hindi ma-save ang demo profile: "],
      [/^Could not save account settings: /, "Hindi ma-save ang mga setting ng account: "],
      [/^Could not sign out: /, "Hindi makapag-sign out: "],
      [/^Could not remove this listing: /, "Hindi maalis ang listing na ito: "],
      [/^Could not clear the demo profile: /, "Hindi maalis ang demo profile: "],
      [/^Could not save your language preference: /, "Hindi ma-save ang piniling wika: "],
      [/^Could not verify this sample: /, "Hindi ma-verify ang sample na ito: "],
      [/^Could not delete this maker profile: /, "Hindi mabura ang profile ng gumagawa: "],
      [/^Could not update sample status: /, "Hindi ma-update ang status ng sample: "],
      [/^Delete (.+) from this browser’s demo directory\? This cannot be undone here\.$/, "Burahin si $1 sa demo directory ng browser na ito? Hindi na ito maibabalik dito."]
    ];
    for (let i = 0; i < dynamicTranslations.length; i += 1) {
      const match = text.match(dynamicTranslations[i][0]);
      if (match) {
        if (dynamicTranslations[i][1].indexOf("$1") !== -1) return text.replace(dynamicTranslations[i][0], dynamicTranslations[i][1]);
        return dynamicTranslations[i][1] + translateLanguageText(text.slice(match[0].length));
      }
    }
    if (text.indexOf("View ") === 0) return "Tingnan ang " + text.slice(5);
    if (text.indexOf("Conversation with ") === 0) return "Usapan kay " + text.slice(18);
    return text;
  }

  function translateTextNode(node) {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    const text = original.slice(leading.length, original.length - trailing.length);
    const translated = text ? leading + translateLanguageText(text) + trailing : original;
    if (node.nodeValue !== translated) node.nodeValue = translated;
  }

  function applyLanguage(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (parent && parent.closest("script, style, textarea, [contenteditable='true'], [data-no-translate]")) continue;
      translateTextNode(node);
    }

    const elements = [root].concat(Array.prototype.slice.call(root.querySelectorAll("*")));
    elements.forEach(function (element) {
      if (element.closest("[data-no-translate]")) return;
      const saved = originalAttributes.get(element) || {};
      const attributes = ["aria-label", "placeholder", "title", "alt"];
      if (element.matches("input[readonly]")) attributes.push("value");
      attributes.forEach(function (attribute) {
        if (!element.hasAttribute(attribute)) return;
        if (!Object.prototype.hasOwnProperty.call(saved, attribute)) {
          saved[attribute] = element.getAttribute(attribute);
        }
        const translated = translateLanguageText(saved[attribute]);
        if (element.getAttribute(attribute) !== translated) element.setAttribute(attribute, translated);
      });
      originalAttributes.set(element, saved);
    });

    document.documentElement.lang = currentLanguage === "fil" ? "fil" : "en";
    document.title = translateLanguageText(originalPageTitle);
    document.querySelectorAll("[data-language-toggle]").forEach(function (button) {
      const languageCode = currentLanguage === "fil" ? "FIL" : "ENG";
      if (button.textContent !== languageCode) button.textContent = languageCode;
    });
  }

  function languageSwitcher() {
    return '<button class="language-switcher" type="button" aria-label="Switch language" data-language-toggle>ENG</button>';
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function vendorImage(vendor, alt) {
    const photo = typeof vendor.photo === "string" && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(vendor.photo)
      ? vendor.photo
      : typeof vendor.image === "string" && (
        /^\.\.\/assets\/[a-z0-9-]+\.(?:jpg|jpeg|png|svg|webp)$/.test(vendor.image) ||
        /^https:\/\/(?:upload\.wikimedia\.org\/wikipedia\/commons\/[A-Za-z0-9_./%-]+\.jpg|live\.staticflickr\.com\/[A-Za-z0-9_./%-]+\.jpg)$/.test(vendor.image)
      )
        ? vendor.image
        : "../assets/maker-goods.svg";
    return '<img data-no-translate src="' + escapeHTML(photo) + '" alt="' + escapeHTML(alt) + '">';
  }

  function listingPhotoData(file) {
    return new Promise(function (resolve, reject) {
      if (!file) {
        resolve("");
        return;
      }
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
        reject(new Error("Choose a JPG, PNG, or WebP image."));
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        reject(new Error("Choose an image smaller than 8 MB."));
        return;
      }

      const objectURL = URL.createObjectURL(file);
      const image = new Image();
      image.onload = function () {
        URL.revokeObjectURL(objectURL);
        try {
          if (!image.naturalWidth || !image.naturalHeight) throw new Error("This image could not be opened.");
          const scale = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
          const context = canvas.getContext("2d");
          if (!context) throw new Error("This browser could not process the image.");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        } catch (error) {
          reject(error);
        }
      };
      image.onerror = function () {
        URL.revokeObjectURL(objectURL);
        reject(new Error("This image could not be opened."));
      };
      image.src = objectURL;
    });
  }

  function readStorage(key, fallback) {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  }

  function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function currentUser() {
    const user = readStorage(STORAGE.user, null);
    if (!user || typeof user !== "object" || Array.isArray(user)) return user;
    if (isAdminEmail(user.email)) return Object.assign({}, user, { role: "admin" });
    if (user.role === "admin") return Object.assign({}, user, { role: "buyer" });
    return user;
  }

  function isAdminEmail(email) {
    return String(email || "").trim().toLowerCase() === ADMIN_EMAIL;
  }

  function currentVendors() {
    const localVendors = readStorage(STORAGE.vendors, []);
    const overrides = readStorage(STORAGE.vendorOverrides, {});
    const deletedIds = readStorage(STORAGE.deletedVendors, []);
    if (!Array.isArray(localVendors)) throw new Error("Saved listings are not in the expected format.");
    if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) {
      throw new Error("Saved maker edits are not in the expected format.");
    }
    if (!Array.isArray(deletedIds)) throw new Error("Deleted maker records are not in the expected format.");
    const sampleVendors = data.vendors.filter(function (vendor) {
      return !deletedIds.includes(vendor.id);
    }).map(function (vendor) {
      const override = overrides[vendor.id];
      if (override != null && (typeof override !== "object" || Array.isArray(override))) {
        throw new Error("A saved maker edit is not in the expected format.");
      }
      return Object.assign({}, vendor, override || {});
    });
    return sampleVendors.concat(localVendors);
  }

  function currentPosts() {
    return readStorage(STORAGE.posts, data.posts.slice());
  }

  function currentQuotes() {
    return readStorage(STORAGE.quotes, []);
  }

  function currentMessages() {
    return readStorage(STORAGE.messages, []);
  }

  function currentReports() {
    return readStorage(STORAGE.reports, []);
  }

  function currentStatuses() {
    return readStorage(STORAGE.statuses, {});
  }

  function vendorStatus(vendor) {
    return currentStatuses()[vendor.id] || vendor.status;
  }

  function statusBadge(status, vendor) {
    const label = vendor && vendor.source === "local" && status === "pending"
      ? "Pending demo listing"
      : status === "verified" ? "Verified sample" : status === "rejected" ? "Rejected sample" : "Pending sample";
    const className = status === "verified" ? "verified-badge" : status === "rejected" ? "rejected-badge" : "pending-badge";
    return '<span class="' + className + '">' + label + "</span>";
  }

  function profileAvatar(className, alt) {
    return '<img class="' + className + '" src="../assets/default-avatar.svg" alt="' + escapeHTML(alt) + '">';
  }

  function navigationLinks(active) {
    const user = currentUser();
    const links = [
      ["directory", "directory.html", "Find makers"],
      ["listing", "list-maker.html", "List your business"],
      ["messages", "messages.html", "Messages"],
      ["account", "account.html", "Account"],
      ["bulletin", "bulletin.html", "Sourcing board"],
      ["about", "about.html", "About"]
    ];
    if (user && user.role === "admin" && isAdminEmail(user.email)) links.push(["admin", "admin.html", "Admin"]);
    const nav = links.map(function (item) {
      if (item[0] === "messages" && !user) {
        return '<span class="nav-unavailable" aria-disabled="true" title="You need an account to access">' + item[2] + "</span>";
      }
      return '<a' + (active === item[0] ? ' aria-current="page"' : "") + ' href="' + item[1] + '">' + item[2] + "</a>";
    }).join("");
    return nav;
  }

  function navigationControls(nav) {
    return '<button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-drawer" data-drawer-toggle><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></button>' +
      '<dialog class="site-drawer" id="site-drawer" aria-label="Site menu"><div class="drawer-header"><a class="brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><button class="drawer-close" type="button" aria-label="Close navigation" data-drawer-close><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg></button></div><nav class="drawer-nav" aria-label="Main navigation">' + nav + "</nav></dialog>";
  }

  function header(active, simple) {
    const user = currentUser();
    const nav = navigationLinks(active);
    const navigation = navigationControls(nav);
    if (simple) {
      return '<header class="simple-header">' + navigation + '<a class="brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a>' + languageSwitcher() + '</header>';
    }
    const accountAction = user
      ? '<a class="account-action" href="account.html">' + profileAvatar("header-avatar", "") + "<span>" + escapeHTML(user.name || "My account") + "</span></a>"
      : '<a class="sign-in" href="login.html">Sign in</a>';
    return '<header class="topbar">' + navigation + '<a class="brand" href="index.html" aria-label="TatagMarinduque home"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><div class="header-actions">' + languageSwitcher() + accountAction + '<a class="button button-small button-dark" href="list-maker.html">List your business <span aria-hidden="true">↗</span></a></div></header>';
  }

  function bindNavigationDrawer() {
    const drawer = app.querySelector("#site-drawer");
    const toggle = app.querySelector("[data-drawer-toggle]");
    if (!drawer || !toggle) return;

    toggle.addEventListener("click", function () {
      drawer.showModal();
      toggle.setAttribute("aria-expanded", "true");
      const currentLink = drawer.querySelector('a[aria-current="page"]') || drawer.querySelector("a");
      if (currentLink) currentLink.focus();
    });
    drawer.addEventListener("click", function (event) {
      if (event.target === drawer || event.target.closest("[data-drawer-close], .drawer-nav a")) {
        drawer.close();
      }
    });
    drawer.addEventListener("cancel", function (event) {
      event.preventDefault();
      drawer.close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drawer.open) {
        event.preventDefault();
        drawer.close();
      }
    });
    drawer.addEventListener("close", function () {
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    });
  }

  function footer() {
    return '<footer class="footer"><a class="brand footer-brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><span>Prototype · browser-only demo</span></footer>';
  }

  function vendorCards(vendors) {
    if (!vendors.length) {
      return '<div class="empty-state"><strong>No makers found.</strong><span>Try a different search or filter.</span></div>';
    }
    return vendors.map(function (vendor, index) {
      const status = vendorStatus(vendor);
      return '<article class="vendor-card"><a class="vendor-image-link" href="maker.html?id=' + encodeURIComponent(vendor.id) + '" aria-label="View ' + escapeHTML(vendor.name) + '">' + vendorImage(vendor, vendor.imageAlt || vendor.product + " photo") + '<span class="card-index">' + String(index + 1).padStart(2, "0") + "</span></a>" +
        '<div class="vendor-card-body"><div class="vendor-topline"><span><span>' + escapeHTML(vendor.category.toUpperCase()) + '</span> · <span data-no-translate>' + escapeHTML(vendor.town.toUpperCase()) + "</span></span>" + statusBadge(status, vendor) + "</div>" +
        '<h3 data-no-translate>' + escapeHTML(vendor.name) + '</h3><p data-no-translate>' + escapeHTML(vendor.description) + '</p><div class="product-line"><span class="product-dot"></span><span data-no-translate>' + escapeHTML(vendor.product) + '</span><span class="capacity" data-no-translate>' + escapeHTML(vendor.capacity) + "</span></div>" +
        '<a class="card-action" href="maker.html?id=' + encodeURIComponent(vendor.id) + '">View maker <span aria-hidden="true">↗</span></a></div></article>';
    }).join("");
  }

  function bindVendorFilters(options) {
    const root = document.getElementById(options.root);
    const list = document.getElementById(options.list);
    const count = document.getElementById(options.count);
    const input = root.querySelector("[data-search]");
    let category = "All makers";
    let verifiedOnly = false;
    const initialQuery = new URLSearchParams(location.search).get("q") || "";
    input.value = initialQuery;

    function render() {
      const query = input.value.trim().toLowerCase();
      const rows = currentVendors().filter(function (vendor) {
        const text = [vendor.name, vendor.town, vendor.product, vendor.description].join(" ").toLowerCase();
        return text.includes(query) && (category === "All makers" || vendor.category === category) &&
          (!verifiedOnly || vendorStatus(vendor) === "verified");
      });
      list.innerHTML = vendorCards(rows);
      count.textContent = rows.length + (rows.length === 1 ? " maker" : " makers");
    }

    root.addEventListener("input", function (event) {
      if (event.target.matches("[data-search]")) render();
    });
    root.addEventListener("click", function (event) {
      const tab = event.target.closest("[data-category]");
      if (tab) {
        category = tab.dataset.category;
        root.querySelectorAll("[data-category]").forEach(function (button) {
          button.classList.toggle("selected", button === tab);
          button.setAttribute("aria-pressed", button === tab ? "true" : "false");
        });
        render();
      }
    });
    const verified = root.querySelector("[data-verified]");
    if (verified) verified.addEventListener("change", function () { verifiedOnly = verified.checked; render(); });
    render();
  }

  function renderHome() {
    app.innerHTML = header("directory", false) +
      '<section class="hero" id="home"><div class="hero-texture" aria-hidden="true"></div><div class="hero-copy-wrap"><p class="eyebrow"><span class="eyebrow-dot"></span>A LOCAL TRADE DIRECTORY</p><h1>Made here.<br><span>Ready to go further.</span></h1><p class="hero-copy">Meet the makers of Marinduque. Find products, connect with local producers, and build your next order together.</p><form class="hero-search" id="hero-search"><label class="search-icon" for="home-search" aria-hidden="true">⌕</label><input id="home-search" name="q" placeholder="Try uraro cookies, pottery, or a town"><button class="button button-straw" type="submit">Find makers <span aria-hidden="true">→</span></button></form><div class="hero-meta"><span>FOOD &amp; CRAFT</span><span class="meta-divider"></span><span>MADE IN MARINDUQUE</span><span class="meta-divider"></span><span>DIRECT CONNECTIONS</span></div></div><div class="hero-art" role="img" aria-label="Illustration of locally made goods"></div><div class="hero-caption">SAMPLE GOODS · ISLAND-MADE CONCEPT</div></section>' +
      '<section class="trust-strip" aria-label="Marketplace concept"><p><span class="strip-number">01</span>Find island-made goods</p><p><span class="strip-number">02</span>Request a sample quote</p><p><span class="strip-number">03</span>Source materials together</p><span class="strip-note">A directory for local trade <span aria-hidden="true">↘</span></span></section>' +
      '<section class="section-wrap" id="directory"><div class="section-heading"><div><p class="eyebrow eyebrow-dark">THE MAKER DIRECTORY <span class="heading-line"></span></p><h2>Good things start<br>with a <em>connection.</em></h2></div><p class="section-intro">Browse sample makers across the island or add a browser-only demo listing for your business.</p></div>' +
      '<div id="home-filters"><label class="search-bar"><span aria-hidden="true">⌕</span><input data-search aria-label="Search makers" placeholder="Search products, makers, or towns"><span class="result-count" data-count></span></label><div class="directory-tools"><div class="filter-tabs" role="group" aria-label="Filter by category"><button class="filter-tab selected" type="button" data-category="All makers" aria-pressed="true">All makers</button><button class="filter-tab" type="button" data-category="Food" aria-pressed="false">Food</button><button class="filter-tab" type="button" data-category="Crafts" aria-pressed="false">Crafts</button></div><label class="verified-toggle"><input type="checkbox" data-verified><span>DTI-verified samples only</span></label></div></div><div class="vendor-grid" id="home-vendors"></div><p class="sample-note"><span class="sample-note-dot"></span>Sample makers are fictional. Photos are representative and may not depict their products. New demo listings stay in this browser and are not verified.</p></section>' +
      '<section class="board-preview"><div class="board-preview-inner"><div><p class="eyebrow eyebrow-dark">THE SOURCING BOARD <span class="heading-line"></span></p><h2>Find what you need.<br><em>Share what you have.</em></h2><p>A sample board for local makers to share materials they need or have available.</p><a class="button button-dark" href="bulletin.html">Explore the board <span>→</span></a></div><div id="home-posts"></div></div></section>' + footer();
    bindVendorFilters({ root: "home-filters", list: "home-vendors", count: "home-filters" });
    document.getElementById("hero-search").addEventListener("submit", function (event) {
      event.preventDefault();
      const value = document.getElementById("home-search").value.trim();
      const target = new URL("directory.html", location.href);
      if (value) target.searchParams.set("q", value);
      location.href = target.href;
    });
    document.getElementById("home-posts").innerHTML = currentPosts().slice(0, 3).map(function (post) {
      return '<article class="preview-post"><div><span class="post-type">' + escapeHTML(post.type) + '</span><h3 data-no-translate>' + escapeHTML(post.material) + '</h3><p data-no-translate>' + escapeHTML(post.amount) + " · " + escapeHTML(post.town) + "</p></div><span aria-hidden=\"true\">↗</span></article>";
    }).join("");
  }

  function renderDirectory() {
    app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">THE MAKER DIRECTORY <span class="heading-line"></span></p><h1>Find your next<br><em>local supplier.</em></h1></div><p>Browse island makers and start a direct wholesale conversation. You can also add a browser-only demo listing.</p></div><p><a class="button button-dark" href="list-maker.html">List your business <span>→</span></a></p><div id="directory-filters"><label class="search-bar"><span aria-hidden="true">⌕</span><input data-search aria-label="Search makers" placeholder="Search products, makers, or towns"><span data-count></span></label><div class="directory-tools"><div class="filter-tabs" role="group" aria-label="Filter by category"><button class="filter-tab selected" type="button" data-category="All makers" aria-pressed="true">All makers</button><button class="filter-tab" type="button" data-category="Food" aria-pressed="false">Food</button><button class="filter-tab" type="button" data-category="Crafts" aria-pressed="false">Crafts</button></div><label class="verified-toggle"><input type="checkbox" data-verified><span>DTI-verified samples only</span></label></div></div><div class="directory-list" id="directory-list"></div><p class="sample-note"><span class="sample-note-dot"></span>Sample makers are fictional. Photos are representative and may not depict their products. New demo listings stay in this browser and are not verified.</p></section>' + footer() + "</div>";
    bindDirectoryFilters();
  }

  function renderListingForm() {
    const editingId = new URLSearchParams(location.search).get("edit");
    const user = currentUser();
    const authReturn = "?next=listing" + (editingId ? "&edit=" + encodeURIComponent(editingId) : "");
    const loginUrl = "login.html" + authReturn;
    if (!user) {
      app.innerHTML = '<div class="simple-page">' + header("listing", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">ACCOUNT REQUIRED</p><h1>Sign in to list your business.</h1><p>Sign in or create a demo profile to list a business. Your listing is saved only in this browser.</p><div class="officer-actions"><a class="button button-dark" href="' + loginUrl + '">Sign in <span>→</span></a><a class="button button-straw" href="register.html' + authReturn + '">Create a demo profile <span>→</span></a></div></section>' + footer() + "</div>";
      return;
    }
    const savedListings = readStorage(STORAGE.vendors, []);
    if (!Array.isArray(savedListings)) throw new Error("Saved listings are not in the expected format.");
    const isAdmin = user && user.role === "admin" && isAdminEmail(user.email);
    const editingListing = editingId ? currentVendors().find(function (listing) {
      return listing.id === editingId;
    }) : null;
    const canEditListing = editingListing && (editingListing.source === "local" || isAdmin);
    if (editingId && !canEditListing) {
      app.innerHTML = '<div class="simple-page">' + header("listing", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">MAKER DIRECTORY</p><h1>Listing unavailable.</h1><p>This listing cannot be edited from this browser account. Browse the directory to find an available listing.</p><a class="button button-dark" href="directory.html">Browse makers <span>→</span></a></section>' + footer() + "</div>";
      return;
    }

    const townOptions = ["Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Sta. Cruz", "Torrijos"].map(function (town) {
      return '<option' + (editingListing && editingListing.town === town ? " selected" : "") + ">" + town + "</option>";
    }).join("");
    const categoryOptions = ["Food", "Crafts"].map(function (category) {
      return '<option value="' + escapeHTML(category) + '"' + (editingListing && editingListing.category === category ? " selected" : "") + ">" + category + "</option>";
    }).join("");
    const existingPhoto = editingListing && typeof editingListing.photo === "string" &&
      /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(editingListing.photo) ? editingListing.photo : "";
    const photoMarkup = '<img id="listing-photo-preview" class="listing-photo-preview" alt="Selected product photo preview"' +
      (existingPhoto ? ' src="' + escapeHTML(existingPhoto) + '"' : " hidden") + ">";
    app.innerHTML = '<div class="simple-page">' + header("listing", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">MAKER DIRECTORY <span class="heading-line"></span></p><h1>' +
      (editingListing ? "Edit your maker<br><em>listing.</em>" : "Create a maker<br><em>listing.</em>") +
      '</h1></div><p>' + (editingListing
        ? "Update your browser-only demo listing. Changes stay in this browser."
        : "Add your products, capacity, and an optional photo to the local demo directory. This form does not publish information online.") +
      '</p></div><div class="bulletin-layout"><section class="dashboard-card"><form class="post-form" id="maker-listing-form"><label>Business or maker name<input name="name" required maxlength="100" autocomplete="organization" value="' +
      escapeHTML(editingListing ? editingListing.name : "") + '"></label><label>Town<select name="town" required><option value=""' +
      (editingListing ? "" : " selected") + ">Choose a town</option>" + townOptions +
      '</select></label><label>Category<select name="category" required><option value=""' +
      (editingListing ? "" : " selected") + ">Choose a category</option>" + categoryOptions +
      '</select></label><label>Product<input name="product" required maxlength="100" placeholder="What do you make or sell?" value="' +
      escapeHTML(editingListing ? editingListing.product : "") + '"></label><label>Description<textarea name="description" required maxlength="300" placeholder="Briefly describe your products">' +
      escapeHTML(editingListing ? editingListing.description : "") + '</textarea></label><label>Available capacity<input name="capacity" required maxlength="80" placeholder="For example, 40 pieces per month" value="' +
      escapeHTML(editingListing ? editingListing.capacity : "") + '"></label><label>Product photo (optional)<input id="listing-photo" type="file" accept="image/jpeg,image/png,image/webp"><span class="form-note">' +
      (editingListing ? "Upload a replacement or leave empty to keep the current photo." : "JPG, PNG, or WebP up to 8 MB. Resized before saving in this browser.") +
      '</span></label>' + photoMarkup + '<p id="photo-status" class="form-note" role="status" aria-live="polite"></p><button class="button button-dark" type="submit">' +
      (editingListing ? "Save listing changes" : "Save demo listing") +
      ' <span>→</span></button><p class="form-note">Saved only in this browser. It will not be published or shared with other visitors.</p><div class="status-region" id="listing-status" role="status" aria-live="polite"></div></form></section><aside class="post-form-wrap"><p class="eyebrow eyebrow-dark">DEMO ONLY <span class="heading-line"></span></p><h2>Not published.</h2><p>Your listing and photo stay in this browser and appear only in its local directory. New listings are pending and unverified. Do not enter sensitive personal or business information.</p></aside></div></section>' + footer() + "</div>";
    const form = document.getElementById("maker-listing-form");
    const photoInput = document.getElementById("listing-photo");
    const photoPreview = document.getElementById("listing-photo-preview");
    let previewURL = "";
    photoInput.addEventListener("change", function () {
      if (previewURL) URL.revokeObjectURL(previewURL);
      previewURL = "";
      photoPreview.hidden = true;
      photoPreview.removeAttribute("src");
      const file = photoInput.files[0];
      const status = document.getElementById("photo-status");
      status.textContent = "";
      if (!file) return;
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
        photoInput.value = "";
        status.textContent = "Choose a JPG, PNG, or WebP image.";
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        photoInput.value = "";
        status.textContent = "Choose an image smaller than 8 MB.";
        return;
      }
      previewURL = URL.createObjectURL(file);
      photoPreview.src = previewURL;
      photoPreview.hidden = false;
    });
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      const fields = new FormData(form);
      submit.disabled = true;
      try {
        const photo = await listingPhotoData(photoInput.files[0]);
        if (!currentUser()) {
          location.href = loginUrl;
          return;
        }
        const listing = Object.assign({}, editingListing || {}, {
          id: editingListing ? editingListing.id : "local-maker-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
          name: String(fields.get("name")).trim(),
          town: String(fields.get("town")),
          category: String(fields.get("category")),
          product: String(fields.get("product")).trim(),
          description: String(fields.get("description")).trim(),
          capacity: String(fields.get("capacity")).trim(),
          photo: photo || (editingListing ? editingListing.photo || "" : ""),
          status: editingListing ? editingListing.status : "pending",
          source: editingListing ? editingListing.source : "local"
        });
        const listings = readStorage(STORAGE.vendors, []);
        if (!Array.isArray(listings)) throw new Error("Saved listings are not in the expected format.");
        if (editingListing) {
          if (editingListing.source === "local") {
            const index = listings.findIndex(function (saved) {
              return saved.id === editingListing.id && saved.source === "local";
            });
            if (index === -1) throw new Error("This demo listing is no longer available.");
            listings[index] = listing;
            writeStorage(STORAGE.vendors, listings);
          } else {
            if (!isAdmin) throw new Error("Admin access is required to edit sample maker profiles.");
            const currentListing = currentVendors().find(function (saved) { return saved.id === editingListing.id; });
            if (!currentListing) throw new Error("This maker profile is no longer available.");
            const overrides = readStorage(STORAGE.vendorOverrides, {});
            if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) {
              throw new Error("Saved maker edits are not in the expected format.");
            }
            overrides[listing.id] = Object.assign({}, currentListing, listing);
            writeStorage(STORAGE.vendorOverrides, overrides);
          }
        } else {
          writeStorage(STORAGE.vendors, [listing].concat(listings));
          form.reset();
        }
        if (previewURL) URL.revokeObjectURL(previewURL);
        previewURL = "";
        photoInput.value = "";
        document.getElementById("photo-status").textContent = "";
        if (editingListing && listing.photo) {
          photoPreview.src = listing.photo;
          photoPreview.hidden = false;
        } else if (editingListing) {
          photoPreview.hidden = true;
          photoPreview.removeAttribute("src");
        } else {
          photoPreview.hidden = true;
          photoPreview.removeAttribute("src");
        }
        document.getElementById("listing-status").innerHTML = editingListing
          ? '<p class="inline-message">Updated in this browser only. <a href="maker.html?id=' + encodeURIComponent(listing.id) + '">View your listing</a>.</p>'
          : '<p class="inline-message">Saved in this browser only. <a href="maker.html?id=' + encodeURIComponent(listing.id) + '">View your listing</a>.</p>';
      } catch (error) {
        document.getElementById("listing-status").innerHTML = '<p class="inline-message" role="alert">Could not save your listing: ' + escapeHTML(error.message) + "</p>";
      } finally {
        submit.disabled = false;
      }
    });
  }

  function bindDirectoryFilters() {
    const root = document.getElementById("directory-filters");
    const list = document.getElementById("directory-list");
    const count = root.querySelector("[data-count]");
    const input = root.querySelector("[data-search]");
    const verified = root.querySelector("[data-verified]");
    let category = "All makers";
    input.value = new URLSearchParams(location.search).get("q") || "";

    function render() {
      const query = input.value.trim().toLowerCase();
      const vendors = currentVendors().filter(function (vendor) {
        return [vendor.name, vendor.town, vendor.product, vendor.description].join(" ").toLowerCase().includes(query) &&
          (category === "All makers" || vendor.category === category) &&
          (!verified.checked || vendorStatus(vendor) === "verified");
      });
      count.textContent = vendors.length + (vendors.length === 1 ? " maker" : " makers");
      list.innerHTML = vendors.length ? vendors.map(function (vendor, index) {
        const status = vendorStatus(vendor);
        const quoteAction = status !== "verified" ? "" : currentUser()
          ? '<a class="button button-dark" href="quote.html?id=' + encodeURIComponent(vendor.id) + '">Request a quote <span>↗</span></a>'
          : '<span class="button button-dark access-unavailable" aria-disabled="true" title="You need an account to access">Request a quote <span>↗</span></span>';
        return '<article class="directory-maker"><a href="maker.html?id=' + encodeURIComponent(vendor.id) + '" class="directory-maker-image" aria-label="View ' + escapeHTML(vendor.name) + '">' + vendorImage(vendor, vendor.imageAlt || vendor.product + " photo") + '<span>' + String(index + 1).padStart(2, "0") + "</span></a><div class=\"directory-maker-content\"><div class=\"vendor-topline\"><span><span>" + escapeHTML(vendor.category.toUpperCase()) + '</span> · <span data-no-translate>' + escapeHTML(vendor.town.toUpperCase()) + "</span></span>" + statusBadge(status, vendor) + '</div><h2 data-no-translate>' + escapeHTML(vendor.name) + '</h2><p data-no-translate>' + escapeHTML(vendor.description) + '</p><div class="maker-capacity"><span>Available capacity</span><strong data-no-translate>' + escapeHTML(vendor.capacity) + '</strong></div><div class="directory-maker-actions"><a class="text-link" href="maker.html?id=' + encodeURIComponent(vendor.id) + '">View maker <span>→</span></a>' + quoteAction + "</div></div></article>";
      }).join("") : '<div class="empty-state"><strong>No makers found.</strong><span>Try another search or filter.</span></div>';
    }

    root.addEventListener("input", function (event) { if (event.target.matches("[data-search]")) render(); });
    verified.addEventListener("change", render);
    root.addEventListener("click", function (event) {
      const tab = event.target.closest("[data-category]");
      if (!tab) return;
      category = tab.dataset.category;
      root.querySelectorAll("[data-category]").forEach(function (button) {
        button.classList.toggle("selected", button === tab);
        button.setAttribute("aria-pressed", button === tab ? "true" : "false");
      });
      render();
    });
    render();
  }

  function renderBulletin() {
    app.innerHTML = '<div class="simple-page">' + header("bulletin", true) + '<section class="page-wrap"><div class="bulletin-heading"><div><p class="eyebrow eyebrow-dark">THE SOURCING BOARD <span class="heading-line"></span></p><h1 class="page-heading">Find what you need.<br><em>Share what you have.</em></h1><p>Connect with sample local producers and suppliers for the materials behind island-made goods.</p></div><a class="simple-back" href="#add-post">Add a post ↓</a></div><div class="bulletin-layout"><section><div class="bulletin-filters" id="post-filters" role="group" aria-label="Filter sourcing posts"><button class="filter-tab selected" type="button" data-type="All posts" aria-pressed="true">All posts</button><button class="filter-tab" type="button" data-type="Need" aria-pressed="false">Need</button><button class="filter-tab" type="button" data-type="Supply" aria-pressed="false">Supply</button><span id="post-count"></span></div><div id="post-list"></div><p class="sample-note"><span class="sample-note-dot"></span>Sample posts are for demonstration only. Contact details are not included.</p><div class="status-region" id="post-status" role="status" aria-live="polite"></div></section><aside class="post-form-wrap" id="add-post"><p class="eyebrow eyebrow-dark">ADD TO THE BOARD <span class="heading-line"></span></p><h2>Post a need<br>or a supply.</h2><form class="post-form" id="new-post"><label>What are you posting?<select name="type"><option value="Need">Need</option><option value="Supply">Supply</option></select></label><label>Material<input name="material" required maxlength="100" placeholder="For example, arrowroot starch"></label><label>Amount<input name="amount" required maxlength="80" placeholder="How much is needed or available?"></label><label>Town<input name="town" required maxlength="60" placeholder="Where are you based?"></label><button class="button button-dark" type="submit">Add sample post <span>→</span></button><p>Saved only in this browser. No post is sent to a server.</p></form></aside></div></section>' + footer() + "</div>";

    let filter = "All posts";
    const list = document.getElementById("post-list");
    const count = document.getElementById("post-count");
    function renderPosts() {
      const posts = currentPosts().filter(function (post) { return filter === "All posts" || post.type === filter; });
      count.textContent = posts.length + (posts.length === 1 ? " post" : " posts");
      list.innerHTML = posts.length ? posts.map(function (post) {
        return '<article class="feed-post"><div><span class="post-type">' + escapeHTML(post.type) + '</span><p data-no-translate>' + escapeHTML(post.time || "Sample") + '</p></div><div><h2 data-no-translate>' + escapeHTML(post.material) + '</h2><p data-no-translate>' + escapeHTML(post.amount) + '</p></div><span class="feed-town" data-no-translate>⌖ ' + escapeHTML(post.town) + "</span></article>";
      }).join("") : '<div class="empty-state"><strong>No posts in this view.</strong><span>Try another filter.</span></div>';
    }
    document.getElementById("post-filters").addEventListener("click", function (event) {
      const tab = event.target.closest("[data-type]");
      if (!tab) return;
      filter = tab.dataset.type;
      document.querySelectorAll("[data-type]").forEach(function (button) {
        button.classList.toggle("selected", button === tab);
        button.setAttribute("aria-pressed", button === tab ? "true" : "false");
      });
      renderPosts();
    });
    document.getElementById("new-post").addEventListener("submit", function (event) {
      event.preventDefault();
      const form = event.currentTarget;
      const fields = new FormData(form);
      const post = {
        id: "local-" + Date.now(),
        type: fields.get("type"),
        material: String(fields.get("material")).trim(),
        amount: String(fields.get("amount")).trim(),
        town: String(fields.get("town")).trim(),
        time: "Just now"
      };
      try {
        writeStorage(STORAGE.posts, [post].concat(currentPosts()));
        form.reset();
        document.getElementById("post-status").innerHTML = '<p class="inline-message">Added to the board in this browser only.</p>';
        renderPosts();
      } catch (error) {
        document.getElementById("post-status").innerHTML = '<p class="inline-message" role="alert">Could not save this post: ' + escapeHTML(error.message) + "</p>";
      }
    });
    renderPosts();
  }

  function renderAbout() {
    app.innerHTML = '<div class="simple-page">' + header("about", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">ABOUT THIS PROJECT <span class="heading-line"></span></p><h1>Local enterprise,<br><em>connected.</em></h1><p>TatagMarinduque is a project concept for a digital directory and trade platform connecting the island’s micro-enterprises with buyers and each other. This simplified version is a static website; its sample interactions stay in your browser.</p></section><section class="about-columns"><article><span>01 / THE CHALLENGE</span><h2>More than a listing.</h2><p>Local makers need a simple way to show what they produce, share capacity, hear from wholesale buyers, and find the materials that keep their work moving.</p></article><article><span>02 / THE RESPONSE</span><h2>Made for local trade.</h2><p>The concept brings a searchable maker directory, a sample quote request flow, and a shared raw-material sourcing board into one place.</p></article><article><span>03 / THE BOUNDARY</span><h2>A browser-only prototype.</h2><p>There is no account service, database, official verification, or message delivery. Never enter real personal or business information.</p></article></section><section class="references"><p class="eyebrow eyebrow-dark">PROJECT REFERENCES &amp; CREDITS <span class="heading-line"></span></p><p>The previous project draft contained citation entries whose bibliographic details were marked for verification. They have not been treated as verified evidence in this static conversion. See <a href="../docs/manuscript_and_references.md">the project manuscript and references notes</a>.</p><p class="reference-note">Original product photographs were replaced with a locally generated illustration. No external image service is required.</p></section>' + footer() + "</div>";
  }

  function renderAuth(mode) {
    const isRegister = mode === "register";
    const title = isRegister ? "Create a demo profile." : "Sign in with email.";
    const authParams = new URLSearchParams(location.search);
    const returnToListing = authParams.get("next") === "listing";
    const listingEditId = returnToListing ? authParams.get("edit") : null;
    const makerReturnId = authParams.get("id");
    const returnToMaker = authParams.get("next") === "maker" && Boolean(makerReturnId);
    const returnToMessages = authParams.get("next") === "messages";
    const returnToQuote = authParams.get("next") === "quote" && Boolean(makerReturnId);
    const returnQuery = returnToListing
      ? "?next=listing" + (listingEditId ? "&edit=" + encodeURIComponent(listingEditId) : "")
      : returnToMaker ? "?next=maker&id=" + encodeURIComponent(makerReturnId)
        : returnToMessages ? "?next=messages" + (makerReturnId ? "&id=" + encodeURIComponent(makerReturnId) : "")
          : returnToQuote ? "?next=quote&id=" + encodeURIComponent(makerReturnId) : "";
    app.innerHTML = '<div class="auth-page"><div class="auth-topbar">' + navigationControls(navigationLinks("")) + '<a class="brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a>' + languageSwitcher() + '</div><section class="auth-panel"><div><p class="eyebrow eyebrow-dark">' + (isRegister ? "JOIN THE DIRECTORY" : "WELCOME BACK") + ' <span class="heading-line"></span></p><h1>' + title + '</h1><p>This is a local-only demo. It does not create a secure account or send data anywhere.</p></div><form class="post-form" id="auth-form">' + (isRegister ? '<label>Your name<input name="name" required maxlength="100" autocomplete="name"></label>' : "") + '<label>Email address<input name="email" required type="email" maxlength="254" autocomplete="email"></label>' + (isRegister ? '<label>Demo role<select name="role"><option value="buyer">Buyer</option><option value="vendor">Maker / vendor</option><option value="officer">Reviewer (demo only)</option></select></label>' : "") + '<button class="button button-dark" type="submit">' + (isRegister ? "Create demo profile" : "Sign in with email") + ' <span>→</span></button><p class="form-note">Email-only local demo; no password or email verification is used. Do not enter real personal or sensitive information.</p><div id="auth-status" class="status-region" role="status" aria-live="polite"></div></form><p class="auth-switch">' + (isRegister ? "Already set up this browser?" : "New to TatagMarinduque?") + ' <a href="' + (isRegister ? "login.html" : "register.html") + returnQuery + '">' + (isRegister ? "Sign in" : "Create a demo profile") + '</a></p><a class="text-link" href="index.html">← Back to home</a></section></div>';
    document.getElementById("auth-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const existing = currentUser();
      const email = String(fields.get("email")).trim();
      const adminLogin = isAdminEmail(email);
      const user = isRegister
        ? { name: String(fields.get("name")).trim(), email: email, role: adminLogin ? "admin" : String(fields.get("role")) }
        : existing
          ? Object.assign({}, existing, { email: email, role: adminLogin ? "admin" : existing.role === "admin" ? "buyer" : existing.role })
          : { name: email.split("@")[0], email: email, role: adminLogin ? "admin" : "buyer" };
      if (!isRegister && existing && String(existing.email || "").toLowerCase() !== email.toLowerCase()) {
        document.getElementById("auth-status").innerHTML = '<p class="inline-message" role="alert">This demo browser has a different profile saved. Use the same email or sign out first.</p>';
        return;
      }
      try {
        writeStorage(STORAGE.user, user);
        location.href = returnToListing
          ? "list-maker.html" + (listingEditId ? "?edit=" + encodeURIComponent(listingEditId) : "")
          : returnToMaker
            ? "maker.html?id=" + encodeURIComponent(makerReturnId)
            : returnToMessages
              ? "messages.html" + (makerReturnId ? "?id=" + encodeURIComponent(makerReturnId) : "")
              : returnToQuote
                ? "quote.html?id=" + encodeURIComponent(makerReturnId)
                : user.role === "admin" ? "admin.html" : user.role === "officer" ? "officer.html" : user.role === "vendor" ? "dashboard.html" : "directory.html";
      } catch (error) {
        document.getElementById("auth-status").innerHTML = '<p class="inline-message" role="alert">Could not save the demo profile: ' + escapeHTML(error.message) + "</p>";
      }
    });
  }

  function bindRemoveListing(id) {
    const removeButton = document.getElementById("remove-listing");
    const confirmation = document.getElementById("remove-listing-confirm");
    const status = document.getElementById("remove-listing-status");
    removeButton.addEventListener("click", function () {
      removeButton.hidden = true;
      confirmation.hidden = false;
    });
    document.getElementById("cancel-remove-listing").addEventListener("click", function () {
      confirmation.hidden = true;
      removeButton.hidden = false;
    });
    document.getElementById("confirm-remove-listing").addEventListener("click", function () {
      try {
        const listings = readStorage(STORAGE.vendors, []);
        if (!Array.isArray(listings)) throw new Error("Saved listings are not in the expected format.");
        const remaining = listings.filter(function (listing) { return listing.id !== id; });
        if (remaining.length === listings.length) throw new Error("This listing was not found in this browser.");
        writeStorage(STORAGE.vendors, remaining);
        location.href = "directory.html";
      } catch (error) {
        status.innerHTML = '<p class="inline-message" role="alert">Could not remove this listing: ' + escapeHTML(error.message) + "</p>";
      }
    });
  }

  function makerContactDetails(maker) {
    if (maker.source === "local") {
      return '<div class="profile-detail-row"><span>CONTACT</span><strong>Not provided in this demo listing</strong></div>';
    }
    return '<div class="profile-detail-row"><span> CONTACT</span><strong data-no-translate>' + escapeHTML(maker.contactName) + "</strong></div>" +
      '<div class="profile-detail-row"><span> EMAIL</span><strong data-no-translate>' + escapeHTML(maker.contactEmail) + "</strong></div>" +
      '<div class="profile-detail-row"><span> PHONE</span><strong data-no-translate>' + escapeHTML(maker.contactPhone) + "</strong></div>" +
      '<p class="profile-demo-note">Fictional contact details only; they cannot be used to reach a maker.</p>';
  }

  function makerCertificationDetails(maker) {
    if (maker.source === "local") {
      return '<div class="profile-detail-row"><span>CERTIFICATIONS</span><strong>Not provided in this demo listing</strong></div>';
    }
    return maker.certifications.map(function (certification) {
      return '<div class="profile-detail-row"><span> CERTIFICATION</span><strong data-no-translate>' + escapeHTML(certification) + "</strong></div>";
    }).join("") + '<p class="profile-demo-note">Fictional demo credentials only; none have been issued or verified.</p>';
  }

  function renderMaker() {
    const id = new URLSearchParams(location.search).get("id");
    const maker = currentVendors().find(function (vendor) { return vendor.id === id; });
    if (!maker) {
      app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">MAKER PROFILE</p><h1>Profile not found.</h1><p>This sample profile is not available. Browse the directory for available makers.</p><a class="button button-dark" href="directory.html">Browse makers <span>→</span></a></section>' + footer() + "</div>";
      return;
    }
    const status = vendorStatus(maker);
    const user = currentUser();
    const messageAction = user
      ? '<a class="button button-dark profile-quote" href="messages.html?id=' + encodeURIComponent(maker.id) + '">Text this maker <span>→</span></a>'
      : '<span class="button button-dark profile-quote access-unavailable" aria-disabled="true" title="You need an account to access">Text this maker <span>→</span></span>';
    const quoteAction = status !== "verified"
      ? '<p class="profile-unavailable">Quote requests are only shown for verified sample makers.</p>'
      : user
        ? '<a class="text-link profile-message-link" href="quote.html?id=' + encodeURIComponent(maker.id) + '">Request a sample quote <span>→</span></a>'
        : '<span class="text-link profile-message-link access-unavailable" aria-disabled="true" title="You need an account to access">Request a sample quote <span>→</span></span>';
    const listingControls = maker.source === "local"
      ? '<div class="listing-management"><div class="listing-controls"><a class="button button-dark" href="list-maker.html?edit=' + encodeURIComponent(maker.id) + '">Edit listing <span>→</span></a><button class="reject-button" id="remove-listing" type="button">Remove this listing</button></div><div id="remove-listing-confirm" hidden><p>Delete this demo listing and its photo from this browser?</p><div class="officer-actions"><button class="button button-dark" id="cancel-remove-listing" type="button">Keep listing</button><button class="reject-button" id="confirm-remove-listing" type="button">Delete listing</button></div></div><div id="remove-listing-status" class="status-region" role="status" aria-live="polite"></div></div>'
      : "";
    const reportForm = user
      ? '<details class="maker-report"><summary>Report maker</summary><p>Choose the closest reason. Please do not include sensitive personal information.</p><form class="post-form" id="maker-report-form"><label>Reason<select name="reason" required><option value="">Choose a reason</option><option value="False advertisement">False advertisement</option><option value="Toxic / rude behavior">Toxic / rude behavior</option><option value="Scamming">Scamming</option><option value="Spam or repeated unwanted contact">Spam or repeated unwanted contact</option><option value="Harassment or threats">Harassment or threats</option><option value="Inappropriate or abusive content">Inappropriate or abusive content</option><option value="Other">Other</option></select></label><label>Additional details (optional)<textarea name="details" maxlength="1000" placeholder="Add context to help explain your report"></textarea></label><button class="button button-dark" type="submit">Submit report <span>→</span></button><p class="form-note">Prototype only: reports are saved in this browser and are not sent for review.</p><div class="status-region" id="maker-report-status" role="status" aria-live="polite"></div></form></details>'
      : '<div class="maker-report"><span class="maker-report-disabled" aria-disabled="true" title="You need an account to report">Report maker</span></div>';
    app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="profile-layout"><div class="profile-image">' + vendorImage(maker, maker.imageAlt || maker.product + " photo") + '<span>' + escapeHTML(status === "verified" ? "Verified sample" : status === "rejected" ? "Rejected sample" : maker.source === "local" ? "Pending demo listing" : "Pending sample") + "</span></div><div class=\"profile-details\"><p class=\"eyebrow eyebrow-dark\">" + escapeHTML(maker.category.toUpperCase()) + ' <span class="heading-line"></span></p><h1 data-no-translate>' + escapeHTML(maker.name) + '</h1><p class="profile-town" data-no-translate>⌖ ' + escapeHTML(maker.town) + ', Marinduque</p><p class="profile-description" data-no-translate>' + escapeHTML(maker.description) + '</p><div class="profile-detail-row"><span>PRODUCT</span><strong data-no-translate>' + escapeHTML(maker.product) + '</strong></div><div class="profile-detail-row"><span>CAPACITY</span><strong data-no-translate>' + escapeHTML(maker.capacity) + '</strong></div>' + makerCertificationDetails(maker) + makerContactDetails(maker) + messageAction + quoteAction + '<p class="sample-note"><span class="sample-note-dot"></span>' + (maker.source === "local" ? "Browser-only demo listing. Not published or verified." : "Fictional sample profile. Representative photo; not a real business or official verification.") + "</p>" + listingControls + reportForm + "</div></section>" + footer() + "</div>";
    const makerReportForm = document.getElementById("maker-report-form");
    if (makerReportForm) makerReportForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const form = event.currentTarget;
      if (!currentUser()) {
        form.innerHTML = '<p class="maker-report-disabled" aria-disabled="true" title="You need an account to report">Report maker</p>';
        return;
      }
      const fields = new FormData(form);
      const report = {
        id: "report-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        makerId: maker.id,
        makerName: maker.name,
        reason: String(fields.get("reason")),
        details: String(fields.get("details") || "").trim(),
        createdAt: new Date().toLocaleString()
      };
      try {
        const reports = currentReports();
        if (!Array.isArray(reports)) throw new Error("Saved reports are not in the expected format.");
        writeStorage(STORAGE.reports, [report].concat(reports));
        form.reset();
        document.getElementById("maker-report-status").innerHTML = '<p class="inline-message">Report saved in this browser only. It has not been sent for review.</p>';
      } catch (error) {
        document.getElementById("maker-report-status").innerHTML = '<p class="inline-message" role="alert">Could not save this report: ' + escapeHTML(error.message) + "</p>";
      }
    });
    if (maker.source === "local") bindRemoveListing(maker.id);
  }

  function renderAccountRequired(activePage, destination, makerId) {
    const authReturn = "?next=" + destination + (makerId ? "&id=" + encodeURIComponent(makerId) : "");
    app.innerHTML = '<div class="simple-page">' + header(activePage, true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">ACCOUNT REQUIRED <span class="heading-line"></span></p><h1>Sign in to continue.</h1><p>Sign in or create a demo profile to access messages and sample quote requests.</p><div class="officer-actions"><a class="button button-dark" href="login.html' + authReturn + '">Sign in <span>→</span></a><a class="button button-straw" href="register.html' + authReturn + '">Create a demo profile <span>→</span></a></div></section>' + footer() + "</div>";
  }

  function renderMessages() {
    const requestedId = new URLSearchParams(location.search).get("id");
    if (!currentUser()) {
      renderAccountRequired("messages", "messages", requestedId);
      return;
    }
    const vendors = currentVendors();
    const maker = vendors.find(function (vendor) { return vendor.id === requestedId; }) || vendors[0];
    if (!maker) {
      app.innerHTML = '<div class="simple-page">' + header("messages", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">MESSAGES</p><h1>No makers to message.</h1><p>Browse the directory to find a maker.</p><a class="button button-dark" href="directory.html">Browse makers</a></section>' + footer() + "</div>";
      return;
    }

    const user = currentUser();
    let activeRole = user && user.role === "vendor" ? "maker" : "buyer";

    function renderThread() {
      const allMessages = currentMessages();
      const messages = allMessages.filter(function (message) { return message.makerId === maker.id; });
      const rows = messages.map(function (message) {
        const direction = message.senderRole === activeRole ? "sent" : "received";
        return '<article class="chat-message ' + direction + '"><span>' + (message.senderRole === "maker" ? "Maker" : "Buyer") + '</span><p data-no-translate>' + escapeHTML(message.text) + '</p><time data-no-translate>' + escapeHTML(message.time) + "</time></article>";
      }).join("");
      const threads = vendors.map(function (vendor) {
        const thread = allMessages.filter(function (message) { return message.makerId === vendor.id; });
        const latest = thread[thread.length - 1];
        return '<a class="conversation-link' + (vendor.id === maker.id ? " selected" : "") + '" href="messages.html?id=' + encodeURIComponent(vendor.id) + '"><strong data-no-translate>' + escapeHTML(vendor.name) + '</strong><span data-no-translate>' + escapeHTML(latest ? latest.text : vendor.product) + "</span></a>";
      }).join("");
      app.innerHTML = '<div class="simple-page">' + header("messages", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">BUYER &amp; MAKER MESSAGES <span class="heading-line"></span></p><h1>Keep the conversation<br><em>moving.</em></h1></div><p>Choose a maker and exchange sample messages about products, availability, or an order.</p></div><div class="messaging-layout"><nav class="conversation-list" aria-label="Maker conversations"><h2>Conversations</h2>' + threads + '</nav><section class="conversation-panel" aria-label="Conversation with ' + escapeHTML(maker.name) + '"><header class="conversation-header"><div><h2 data-no-translate>' + escapeHTML(maker.name) + '</h2><p data-no-translate>' + escapeHTML(maker.product) + " · " + escapeHTML(maker.town) + '</p></div><label>Preview as<select id="message-role"><option value="buyer"' + (activeRole === "buyer" ? " selected" : "") + '>Buyer</option><option value="maker"' + (activeRole === "maker" ? " selected" : "") + '>Maker</option></select></label></header><div class="message-list" id="message-list" aria-live="polite">' + (rows || '<p class="conversation-empty">No messages yet. Send a note to start the conversation.</p>') + '</div><form class="message-form" id="message-form"><label class="sr-only" for="message-text">Write a message</label><textarea id="message-text" name="text" required maxlength="1000" placeholder="Write a message…"></textarea><button class="button button-dark" type="submit">Send message <span>→</span></button><div class="status-region" id="message-status" role="status" aria-live="polite"></div></form></section></div><p class="message-demo-note"><strong>Prototype only:</strong> messages are saved in this browser and are not delivered to another person or device. Use fictional details only.</p></section>' + footer() + "</div>";
      document.getElementById("message-role").addEventListener("change", function (event) {
        activeRole = event.currentTarget.value;
        renderThread();
      });
      document.getElementById("message-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const form = event.currentTarget;
        const text = String(new FormData(form).get("text") || "").trim();
        if (!text) return;
        const message = {
          id: "message-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
          makerId: maker.id,
          senderRole: activeRole,
          text: text,
          time: new Date().toLocaleString()
        };
        try {
          writeStorage(STORAGE.messages, currentMessages().concat(message));
          renderThread();
        } catch (error) {
          document.getElementById("message-status").textContent = "Could not save this message: " + error.message;
        }
      });
    }

    renderThread();
  }

  function renderQuote() {
    const id = new URLSearchParams(location.search).get("id");
    if (!currentUser()) {
      renderAccountRequired("directory", "quote", id);
      return;
    }
    const maker = currentVendors().find(function (vendor) { return vendor.id === id; });
    if (!maker || vendorStatus(maker) !== "verified") {
      app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">SAMPLE QUOTE</p><h1>Quote request unavailable.</h1><p>Choose an available verified sample maker from the directory.</p><a class="button button-dark" href="directory.html">Browse makers</a></section>' + footer() + "</div>";
      return;
    }
    app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">SAMPLE QUOTE REQUEST <span class="heading-line"></span></p><h1>Start a conversation.</h1></div><p>This preview is saved in this browser only. It will not be sent to the maker.</p></div><div class="bulletin-layout"><section class="dashboard-card"><h2 data-no-translate>' + escapeHTML(maker.name) + '</h2><p data-no-translate>' + escapeHTML(maker.product) + " · " + escapeHTML(maker.town) + '</p><p data-no-translate>' + escapeHTML(maker.capacity) + '</p><form class="post-form" id="quote-form"><label>Your name<input name="name" required maxlength="100"></label><label>Email address<input name="email" type="email" required maxlength="254"></label><label>Quantity requested<input name="quantity" required maxlength="80" placeholder="For example, 20 boxes"></label><label>Message<textarea name="message" maxlength="1000" placeholder="Optional details"></textarea></label><button class="button button-dark" type="submit">Save sample request <span>→</span></button><div id="quote-status" class="status-region" role="status" aria-live="polite"></div></form></section><aside class="post-form-wrap"><p class="eyebrow eyebrow-dark">BEFORE YOU CONTINUE</p><h2>Demo only.</h2><p>No message or contact information is transmitted. Do not enter real personal information. Sample makers are fictional.</p></aside></div></section>' + footer() + "</div>";
    document.getElementById("quote-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const request = {
        id: "quote-" + Date.now(),
        vendorId: maker.id,
        vendorName: maker.name,
        name: String(fields.get("name")).trim(),
        email: String(fields.get("email")).trim(),
        quantity: String(fields.get("quantity")).trim(),
        message: String(fields.get("message") || "").trim(),
        createdAt: new Date().toLocaleString()
      };
      try {
        writeStorage(STORAGE.quotes, [request].concat(currentQuotes()));
        document.getElementById("quote-status").innerHTML = '<p class="inline-message">Saved in this browser only. <a href="dashboard.html">View the demo dashboard</a>.</p>';
        event.currentTarget.reset();
      } catch (error) {
        document.getElementById("quote-status").innerHTML = '<p class="inline-message" role="alert">Could not save the sample request: ' + escapeHTML(error.message) + "</p>";
      }
    });
  }

  function renderDashboard() {
    const user = currentUser();
    if (!user) {
      app.innerHTML = '<div class="simple-page">' + header("", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">MAKER DASHBOARD</p><h1>Set up a demo profile.</h1><p>Sign in to this browser demo to see locally saved sample quote requests.</p><a class="button button-dark" href="login.html">Sign in <span>→</span></a></section>' + footer() + "</div>";
      return;
    }
    const quotes = currentQuotes();
    const myQuotes = quotes;
    app.innerHTML = '<div class="simple-page">' + header("", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">BROWSER-ONLY DASHBOARD <span class="heading-line"></span></p><h1>Hello, <em data-no-translate>' + escapeHTML(user.name) + '.</em></h1></div><button class="sign-out" id="sign-out" type="button">Sign out</button></div><div class="dashboard-grid"><article class="dashboard-card"><h2>Demo profile</h2><p><strong>Name</strong> · <span data-no-translate>' + escapeHTML(user.name) + '</span></p><p><strong>Email</strong> · <span data-no-translate>' + escapeHTML(user.email) + '</span></p><p><strong>Role</strong> · ' + escapeHTML(user.role) + '</p><p>This profile is stored only in this browser and is not protected by a real login.</p><a class="text-link" href="account.html">Manage account →</a></article><article class="dashboard-card"><h2>Sample quote requests</h2><div id="dashboard-quotes">' + (myQuotes.length ? myQuotes.map(function (quote) {
      return '<article class="quote-item"><h3 data-no-translate>' + escapeHTML(quote.vendorName) + '</h3><p data-no-translate>' + escapeHTML(quote.quantity) + " · " + escapeHTML(quote.createdAt) + '</p><p data-no-translate>' + escapeHTML(quote.name) + " (" + escapeHTML(quote.email) + ")</p></article>";
    }).join("") : '<p>No quote requests saved in this browser yet.</p>') + '</div><a class="text-link" href="directory.html">Browse sample makers →</a></article></div><p class="sample-note"><span class="sample-note-dot"></span>Do not use this prototype to store real personal or business information.</p></section>' + footer() + "</div>";
    document.getElementById("sign-out").addEventListener("click", function () {
      try {
        localStorage.removeItem(STORAGE.user);
        location.href = "index.html";
      } catch (error) {
        window.alert(translateLanguageText("Could not clear the demo profile: " + error.message));
      }
    });
  }

  function renderAccount() {
    const user = currentUser();
    if (!user) {
      app.innerHTML = '<div class="simple-page">' + header("account", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">DEMO ACCOUNT</p><h1>Set up your profile.</h1><p>Sign in or create a demo profile to manage your details in this browser.</p><div class="officer-actions"><a class="button button-dark" href="login.html">Sign in <span>→</span></a><a class="button button-straw" href="register.html">Create profile <span>→</span></a></div></section>' + footer() + "</div>";
      return;
    }

    const adminEmail = isAdminEmail(user.email);
    const role = ["buyer", "vendor", "officer"].includes(user.role) ? user.role : "buyer";
    const roleField = adminEmail
      ? '<label>Account role<input value="Admin (email login)" readonly></label>'
      : '<label>Demo role<select name="role"><option value="buyer"' + (role === "buyer" ? " selected" : "") + '>Buyer</option><option value="vendor"' + (role === "vendor" ? " selected" : "") + '>Maker / vendor</option><option value="officer"' + (role === "officer" ? " selected" : "") + '>Reviewer (demo only)</option></select></label>';
    app.innerHTML = '<div class="simple-page">' + header("account", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">DEMO ACCOUNT <span class="heading-line"></span></p><h1>Account <em>settings.</em></h1></div><div class="account-heading-actions"><p>Edit the profile saved for this browser. Changes are local to this device.</p><button class="sign-out" id="account-sign-out" type="button">Log out</button></div></div><div class="bulletin-layout"><section class="dashboard-card"><div class="account-profile-summary">' + profileAvatar("account-avatar", "Default profile picture") + '<div><strong data-no-translate>' + escapeHTML(user.name) + '</strong><span>Default profile picture</span></div></div><form class="post-form" id="account-form"><label>Your name<input name="name" required maxlength="100" autocomplete="name" value="' + escapeHTML(user.name) + '"></label><label>Email address<input name="email" type="email" required maxlength="254" autocomplete="email" value="' + escapeHTML(user.email) + '"></label>' + roleField + '<button class="button button-dark" type="submit">Save account changes <span>→</span></button><div class="status-region" id="account-status" role="status" aria-live="polite"></div></form></section><aside class="post-form-wrap"><p class="eyebrow eyebrow-dark">LOCAL DEMO ONLY <span class="heading-line"></span></p><h2>Not a secure account.</h2><p>This profile is stored in this browser only. It has no password and cannot be used to sign in on another device. Do not enter real personal information.</p></aside></div></section>' + footer() + "</div>";
    document.getElementById("account-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const email = String(fields.get("email")).trim();
      const requestedRole = String(fields.get("role") || "buyer");
      const updatedUser = {
        name: String(fields.get("name")).trim(),
        email: email,
        role: isAdminEmail(email) ? "admin" : requestedRole === "admin" ? "buyer" : requestedRole
      };
      try {
        writeStorage(STORAGE.user, updatedUser);
        if (user.role !== updatedUser.role) {
          location.href = updatedUser.role === "admin" ? "admin.html" : "index.html";
          return;
        }
        document.querySelector(".account-profile-summary strong").textContent = updatedUser.name;
        document.getElementById("account-status").innerHTML = '<p class="inline-message">Account settings saved in this browser.</p>';
      } catch (error) {
        document.getElementById("account-status").innerHTML = '<p class="inline-message" role="alert">Could not save account settings: ' + escapeHTML(error.message) + "</p>";
      }
    });
    document.getElementById("account-sign-out").addEventListener("click", function () {
      try {
        localStorage.removeItem(STORAGE.user);
        location.href = "index.html";
      } catch (error) {
        document.getElementById("account-status").innerHTML = '<p class="inline-message" role="alert">Could not sign out: ' + escapeHTML(error.message) + "</p>";
      }
    });
  }

  function renderAdmin() {
    const user = currentUser();
    if (!user || user.role !== "admin" || !isAdminEmail(user.email)) {
      app.innerHTML = '<div class="simple-page">' + header("", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">ADMIN WORKSPACE</p><h1>Admin email login required.</h1><p>Sign in with the configured Admin email to open the local management tools. This prototype does not provide secure authentication.</p><a class="button button-dark" href="login.html">Sign in with email <span>→</span></a></section>' + footer() + "</div>";
      return;
    }

    app.innerHTML = '<div class="simple-page">' + header("admin", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">BROWSER-ONLY ADMIN <span class="heading-line"></span></p><h1>Manage the<br><em>directory.</em></h1></div><p>Review reports, edit maker listings, or remove profiles from this browser’s demo directory.</p></div><p class="message-demo-note"><strong>Demo only:</strong> admin access is not secure. Changes are local to this browser and are not sent to makers or a moderation team.</p><section class="admin-section"><h2 class="admin-section-heading">User reports</h2><div class="dashboard-grid" id="admin-reports"></div></section><section class="admin-section"><h2 class="admin-section-heading">Maker profiles</h2><div class="dashboard-grid" id="admin-makers"></div></section><div class="status-region" id="admin-status" role="status" aria-live="polite"></div></section>' + footer() + "</div>";

    const reports = currentReports();
    if (!Array.isArray(reports)) throw new Error("Saved reports are not in the expected format.");
    const vendors = currentVendors();
    const reportList = document.getElementById("admin-reports");
    const makerList = document.getElementById("admin-makers");
    reportList.innerHTML = reports.length ? reports.map(function (report) {
      const makerExists = vendors.some(function (vendor) { return vendor.id === report.makerId; });
      return '<article class="dashboard-card admin-entry"><div class="vendor-topline"><span>' + escapeHTML(report.reason || "Uncategorized report") + '</span><time data-no-translate>' + escapeHTML(report.createdAt || "") + '</time></div><h3 data-no-translate>' + escapeHTML(report.makerName || "Unknown maker") + '</h3><p data-no-translate>' + escapeHTML(report.details || "No additional details provided.") + '</p>' + (makerExists ? '<a class="text-link" href="maker.html?id=' + encodeURIComponent(report.makerId) + '">View maker →</a>' : '<span class="form-note">The maker profile has been deleted.</span>') + "</article>";
    }).join("") : '<div class="empty-state"><strong>No reports yet.</strong><span>Maker reports saved in this browser will appear here.</span></div>';

    function renderMakers() {
      const current = currentVendors();
      makerList.innerHTML = current.length ? current.map(function (maker) {
        const status = vendorStatus(maker);
        const verifyAction = maker.source !== "local" && status === "pending"
          ? '<button class="button button-dark" type="button" data-verify-sample>Mark sample verified</button>'
          : "";
        return '<article class="dashboard-card admin-entry" data-admin-maker-id="' + escapeHTML(maker.id) + '"><div class="vendor-topline"><span><span>' + escapeHTML(maker.category.toUpperCase()) + '</span> · <span data-no-translate>' + escapeHTML(maker.town) + '</span></span>' + statusBadge(status, maker) + '</div><h3 data-no-translate>' + escapeHTML(maker.name) + '</h3><p data-no-translate>' + escapeHTML(maker.product) + " · " + escapeHTML(maker.capacity) + '</p><div class="officer-actions"><a class="button button-dark" href="list-maker.html?edit=' + encodeURIComponent(maker.id) + '">Edit profile</a>' + verifyAction + '<button class="reject-button" type="button" data-delete-maker>Delete profile</button></div></article>';
      }).join("") : '<div class="empty-state"><strong>No maker profiles.</strong><span>The directory is empty in this browser.</span></div>';
    }

    makerList.addEventListener("click", function (event) {
      const verifyButton = event.target.closest("[data-verify-sample]");
      if (verifyButton) {
        const card = verifyButton.closest("[data-admin-maker-id]");
        const maker = currentVendors().find(function (vendor) { return vendor.id === card.dataset.adminMakerId; });
        if (!maker || maker.source === "local" || vendorStatus(maker) !== "pending") {
          document.getElementById("admin-status").innerHTML = '<p class="inline-message" role="alert">This pending sample is no longer available.</p>';
          return;
        }
        try {
          const statuses = currentStatuses();
          if (!statuses || typeof statuses !== "object" || Array.isArray(statuses)) {
            throw new Error("Saved sample statuses are not in the expected format.");
          }
          statuses[maker.id] = "verified";
          writeStorage(STORAGE.statuses, statuses);
          renderMakers();
          document.getElementById("admin-status").innerHTML = '<p class="inline-message">Sample marked verified in this browser only.</p>';
        } catch (error) {
          document.getElementById("admin-status").innerHTML = '<p class="inline-message" role="alert">Could not verify this sample: ' + escapeHTML(error.message) + "</p>";
        }
        return;
      }

      const button = event.target.closest("[data-delete-maker]");
      if (!button) return;
      const card = button.closest("[data-admin-maker-id]");
      const maker = currentVendors().find(function (vendor) { return vendor.id === card.dataset.adminMakerId; });
      if (!maker) {
        document.getElementById("admin-status").innerHTML = '<p class="inline-message" role="alert">This maker profile is no longer available.</p>';
        return;
      }
      if (!window.confirm(translateLanguageText("Delete " + maker.name + " from this browser’s demo directory? This cannot be undone here."))) return;

      try {
        if (maker.source === "local") {
          const localVendors = readStorage(STORAGE.vendors, []);
          if (!Array.isArray(localVendors)) throw new Error("Saved listings are not in the expected format.");
          const remaining = localVendors.filter(function (vendor) { return vendor.id !== maker.id; });
          if (remaining.length === localVendors.length) throw new Error("This local maker listing was not found.");
          writeStorage(STORAGE.vendors, remaining);
        } else {
          const deletedIds = readStorage(STORAGE.deletedVendors, []);
          const overrides = readStorage(STORAGE.vendorOverrides, {});
          if (!Array.isArray(deletedIds)) throw new Error("Deleted maker records are not in the expected format.");
          if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) {
            throw new Error("Saved maker edits are not in the expected format.");
          }
          delete overrides[maker.id];
          writeStorage(STORAGE.vendorOverrides, overrides);
          if (!deletedIds.includes(maker.id)) deletedIds.push(maker.id);
          writeStorage(STORAGE.deletedVendors, deletedIds);
        }
        renderMakers();
        document.getElementById("admin-status").innerHTML = '<p class="inline-message">Maker profile deleted from this browser only.</p>';
      } catch (error) {
        document.getElementById("admin-status").innerHTML = '<p class="inline-message" role="alert">Could not delete this maker profile: ' + escapeHTML(error.message) + "</p>";
      }
    });

    renderMakers();
  }

  function renderOfficer() {
    const user = currentUser();
    if (!user || user.role !== "officer") {
      app.innerHTML = '<div class="simple-page">' + header("", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">DEMO REVIEW QUEUE</p><h1>Reviewer profile required.</h1><p>Choose the reviewer role on the demo registration page. This is not an official verification tool.</p><a class="button button-dark" href="register.html">Create reviewer demo profile</a></section>' + footer() + "</div>";
      return;
    }
    app.innerHTML = '<div class="simple-page">' + header("", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">DEMO REVIEW QUEUE <span class="heading-line"></span></p><h1>Review maker<br><em>profiles.</em></h1></div><p>This control changes only the sample status in this browser. It is not an official decision.</p></div><div id="review-list" class="dashboard-grid"></div><div id="review-status" class="status-region" role="status" aria-live="polite"></div><p class="sample-note"><span class="sample-note-dot"></span>Demo reviewer only. No DTI decision or certification is represented.</p></section>' + footer() + "</div>";
    const list = document.getElementById("review-list");
    function renderQueue() {
      const pending = currentVendors().filter(function (vendor) { return vendorStatus(vendor) === "pending"; });
      list.innerHTML = pending.length ? pending.map(function (vendor) {
        return '<article class="review-card dashboard-card" data-review-id="' + escapeHTML(vendor.id) + '"><div class="vendor-topline">' + statusBadge("pending", vendor) + "<span><span>" + escapeHTML(vendor.category.toUpperCase()) + '</span> · <span data-no-translate>' + escapeHTML(vendor.town) + '</span></span></div><h2 data-no-translate>' + escapeHTML(vendor.name) + '</h2><p data-no-translate>' + escapeHTML(vendor.description) + '</p><p><strong>Capacity:</strong> <span data-no-translate>' + escapeHTML(vendor.capacity) + '</span></p><div class="officer-actions"><button class="button button-dark" type="button" data-review="verified">Mark sample verified</button><button class="reject-button" type="button" data-review="rejected">Reject sample</button></div></article>';
      }).join("") : '<div class="empty-state"><strong>All caught up.</strong><span>No pending sample profiles to review.</span></div>';
    }
    list.addEventListener("click", function (event) {
      const button = event.target.closest("[data-review]");
      if (!button) return;
      const card = button.closest("[data-review-id]");
      const statuses = currentStatuses();
      statuses[card.dataset.reviewId] = button.dataset.review;
      try {
        writeStorage(STORAGE.statuses, statuses);
        document.getElementById("review-status").innerHTML = '<p class="inline-message">Sample status updated in this browser only.</p>';
        renderQueue();
      } catch (error) {
        document.getElementById("review-status").innerHTML = '<p class="inline-message" role="alert">Could not update sample status: ' + escapeHTML(error.message) + "</p>";
      }
    });
    renderQueue();
  }

  const renderers = {
    home: renderHome,
    directory: renderDirectory,
    bulletin: renderBulletin,
    about: renderAbout,
    login: function () { renderAuth("login"); },
    register: function () { renderAuth("register"); },
    "list-maker": renderListingForm,
    maker: renderMaker,
    quote: renderQuote,
    messages: renderMessages,
    dashboard: renderDashboard,
    account: renderAccount,
    admin: renderAdmin,
    officer: renderOfficer
  };

  try {
    if (!data || !Array.isArray(data.vendors)) throw new Error("Sample data did not load.");
    if (!renderers[page]) throw new Error("Unknown page: " + page);
    try {
      currentLanguage = localStorage.getItem(STORAGE.language) === "fil" ? "fil" : "en";
    } catch (error) {
      console.error("Could not load the saved language preference:", error);
    }
    renderers[page]();
    bindNavigationDrawer();
    applyLanguage(app);
    const languageObserver = new MutationObserver(function () {
      applyLanguage(app);
    });
    languageObserver.observe(app, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["aria-label", "placeholder", "title", "alt"] });
    document.addEventListener("click", function (event) {
      if (!event.target.closest("[data-language-toggle]")) return;
      const selectedLanguage = currentLanguage === "fil" ? "en" : "fil";
      try {
        localStorage.setItem(STORAGE.language, selectedLanguage);
      } catch (error) {
        window.alert(translateLanguageText("Could not save your language preference: " + error.message));
        return;
      }
      currentLanguage = selectedLanguage;
      applyLanguage(app);
    });
  } catch (error) {
    console.error("Could not render the static app:", error);
    app.innerHTML = '<section class="page-wrap"><div class="empty-state"><strong>The page could not be loaded.</strong><span>' + escapeHTML(error.message) + "</span></div></section>";
  }
}());
