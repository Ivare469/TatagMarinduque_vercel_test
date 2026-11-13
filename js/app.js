(function () {
  "use strict";

  const app = document.getElementById("app");
  const data = window.TatagData;
  const STORAGE = {
    user: "tatag-demo-user",
    posts: "tatag-demo-posts",
    quotes: "tatag-demo-quotes",
    statuses: "tatag-demo-vendor-statuses"
  };
  const page = document.body.dataset.page;

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
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
    return readStorage(STORAGE.user, null);
  }

  function currentPosts() {
    return readStorage(STORAGE.posts, data.posts.slice());
  }

  function currentQuotes() {
    return readStorage(STORAGE.quotes, []);
  }

  function currentStatuses() {
    return readStorage(STORAGE.statuses, {});
  }

  function vendorStatus(vendor) {
    return currentStatuses()[vendor.id] || vendor.status;
  }

  function statusBadge(status) {
    const label = status === "verified" ? "Verified sample" : status === "rejected" ? "Rejected sample" : "Pending sample";
    const className = status === "verified" ? "verified-badge" : status === "rejected" ? "rejected-badge" : "pending-badge";
    return '<span class="' + className + '">' + label + "</span>";
  }

  function header(active, simple) {
    const links = [
      ["directory", "directory.html", "Find makers"],
      ["bulletin", "bulletin.html", "Sourcing board"],
      ["about", "about.html", "About"]
    ];
    const nav = links.map(function (item) {
      return '<a' + (active === item[0] ? ' aria-current="page"' : "") + ' href="' + item[1] + '">' + item[2] + "</a>";
    }).join("");
    if (simple) {
      return '<header class="simple-header"><a class="brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><nav class="simple-nav" aria-label="Main navigation">' + nav + '</nav></header>';
    }
    return '<header class="topbar"><a class="brand" href="index.html" aria-label="TatagMarinduque home"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><nav class="desktop-nav" aria-label="Main navigation">' + nav + '</nav><div class="header-actions"><a class="sign-in" href="login.html">Sign in</a><a class="button button-small button-dark" href="register.html">Join as a maker <span aria-hidden="true">↗</span></a></div></header>';
  }

  function footer() {
    return '<footer class="footer"><a class="brand footer-brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><span>Prototype · fictional sample data only</span></footer>';
  }

  function vendorCards(vendors) {
    if (!vendors.length) {
      return '<div class="empty-state"><strong>No makers found.</strong><span>Try a different search or filter.</span></div>';
    }
    return vendors.map(function (vendor, index) {
      const status = vendorStatus(vendor);
      return '<article class="vendor-card"><a class="vendor-image-link" href="maker.html?id=' + encodeURIComponent(vendor.id) + '" aria-label="View ' + escapeHTML(vendor.name) + '"><img src="../assets/maker-goods.svg" alt="' + escapeHTML(vendor.product) + ' illustration"><span class="card-index">' + String(index + 1).padStart(2, "0") + "</span></a>" +
        '<div class="vendor-card-body"><div class="vendor-topline"><span>' + escapeHTML(vendor.category.toUpperCase()) + " · " + escapeHTML(vendor.town.toUpperCase()) + "</span>" + statusBadge(status) + "</div>" +
        "<h3>" + escapeHTML(vendor.name) + "</h3><p>" + escapeHTML(vendor.description) + '</p><div class="product-line"><span class="product-dot"></span>' + escapeHTML(vendor.product) + '<span class="capacity">' + escapeHTML(vendor.capacity) + "</span></div>" +
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
      const rows = data.vendors.filter(function (vendor) {
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
      '<section class="section-wrap" id="directory"><div class="section-heading"><div><p class="eyebrow eyebrow-dark">THE MAKER DIRECTORY <span class="heading-line"></span></p><h2>Good things start<br>with a <em>connection.</em></h2></div><p class="section-intro">Browse fictional sample makers across the island. Search, filter, and explore the prototype workflows.</p></div>' +
      '<div id="home-filters"><label class="search-bar"><span aria-hidden="true">⌕</span><input data-search aria-label="Search makers" placeholder="Search products, makers, or towns"><span class="result-count" data-count></span></label><div class="directory-tools"><div class="filter-tabs" role="group" aria-label="Filter by category"><button class="filter-tab selected" type="button" data-category="All makers" aria-pressed="true">All makers</button><button class="filter-tab" type="button" data-category="Food" aria-pressed="false">Food</button><button class="filter-tab" type="button" data-category="Crafts" aria-pressed="false">Crafts</button></div><label class="verified-toggle"><input type="checkbox" data-verified><span>DTI-verified samples only</span></label></div></div><div class="vendor-grid" id="home-vendors"></div><p class="sample-note"><span class="sample-note-dot"></span>All names and listings are fictional samples. Verification is not official.</p></section>' +
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
      return '<article class="preview-post"><div><span class="post-type">' + escapeHTML(post.type) + "</span><h3>" + escapeHTML(post.material) + "</h3><p>" + escapeHTML(post.amount) + " · " + escapeHTML(post.town) + "</p></div><span aria-hidden=\"true\">↗</span></article>";
    }).join("");
  }

  function renderDirectory() {
    app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">THE MAKER DIRECTORY <span class="heading-line"></span></p><h1>Find your next<br><em>local supplier.</em></h1></div><p>Browse island makers and start a direct wholesale conversation. All listings are fictional samples.</p></div><div id="directory-filters"><label class="search-bar"><span aria-hidden="true">⌕</span><input data-search aria-label="Search makers" placeholder="Search products, makers, or towns"><span data-count></span></label><div class="directory-tools"><div class="filter-tabs" role="group" aria-label="Filter by category"><button class="filter-tab selected" type="button" data-category="All makers" aria-pressed="true">All makers</button><button class="filter-tab" type="button" data-category="Food" aria-pressed="false">Food</button><button class="filter-tab" type="button" data-category="Crafts" aria-pressed="false">Crafts</button></div><label class="verified-toggle"><input type="checkbox" data-verified><span>DTI-verified samples only</span></label></div></div><div class="directory-list" id="directory-list"></div><p class="sample-note"><span class="sample-note-dot"></span>Sample data only. No real businesses or certifications are represented.</p></section>' + footer() + "</div>";
    bindDirectoryFilters();
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
      const vendors = data.vendors.filter(function (vendor) {
        return [vendor.name, vendor.town, vendor.product, vendor.description].join(" ").toLowerCase().includes(query) &&
          (category === "All makers" || vendor.category === category) &&
          (!verified.checked || vendorStatus(vendor) === "verified");
      });
      count.textContent = vendors.length + (vendors.length === 1 ? " maker" : " makers");
      list.innerHTML = vendors.length ? vendors.map(function (vendor, index) {
        const status = vendorStatus(vendor);
        return '<article class="directory-maker"><a href="maker.html?id=' + encodeURIComponent(vendor.id) + '" class="directory-maker-image" aria-label="View ' + escapeHTML(vendor.name) + '"><img src="../assets/maker-goods.svg" alt=""><span>' + String(index + 1).padStart(2, "0") + "</span></a><div class=\"directory-maker-content\"><div class=\"vendor-topline\"><span>" + escapeHTML(vendor.category.toUpperCase() + " · " + vendor.town.toUpperCase()) + "</span>" + statusBadge(status) + "</div><h2>" + escapeHTML(vendor.name) + "</h2><p>" + escapeHTML(vendor.description) + '</p><div class="maker-capacity"><span>Available capacity</span><strong>' + escapeHTML(vendor.capacity) + '</strong></div><div class="directory-maker-actions"><a class="text-link" href="maker.html?id=' + encodeURIComponent(vendor.id) + '">View maker <span>→</span></a>' + (status === "verified" ? '<a class="button button-dark" href="quote.html?id=' + encodeURIComponent(vendor.id) + '">Request a quote <span>↗</span></a>' : "") + "</div></div></article>";
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
    app.innerHTML = '<div class="simple-page">' + header("bulletin", true) + '<section class="page-wrap"><div class="bulletin-heading"><div><p class="eyebrow eyebrow-dark">THE SOURCING BOARD <span class="heading-line"></span></p><h1 class="page-heading">Find what you need.<br><em>Share what you have.</em></h1><p>Connect with sample local producers and suppliers for the materials behind island-made goods.</p></div><a class="simple-back" href="#add-post">Add a post ↓</a></div><div class="bulletin-layout"><section><div class="bulletin-filters" id="post-filters" role="group" aria-label="Filter sourcing posts"><button class="filter-tab selected" type="button" data-type="All posts" aria-pressed="true">All posts</button><button class="filter-tab" type="button" data-type="Need" aria-pressed="false">Need</button><button class="filter-tab" type="button" data-type="Supply" aria-pressed="false">Supply</button><span id="post-count"></span></div><div id="post-list"></div><p class="sample-note"><span class="sample-note-dot"></span>Sample posts are for demonstration only. Contact details are not included.</p><div class="status-region" id="post-status" role="status" aria-live="polite"></div></section><aside class="post-form-wrap" id="add-post"><p class="eyebrow eyebrow-dark">ADD TO THE BOARD <span class="heading-line"></span></p><h2>Post a need<br>or a supply.</h2><form class="post-form" id="new-post"><label>What are you posting?<select name="type"><option>Need</option><option>Supply</option></select></label><label>Material<input name="material" required maxlength="100" placeholder="For example, arrowroot starch"></label><label>Amount<input name="amount" required maxlength="80" placeholder="How much is needed or available?"></label><label>Town<input name="town" required maxlength="60" placeholder="Where are you based?"></label><button class="button button-dark" type="submit">Add sample post <span>→</span></button><p>Saved only in this browser. No post is sent to a server.</p></form></aside></div></section>' + footer() + "</div>";

    let filter = "All posts";
    const list = document.getElementById("post-list");
    const count = document.getElementById("post-count");
    function renderPosts() {
      const posts = currentPosts().filter(function (post) { return filter === "All posts" || post.type === filter; });
      count.textContent = posts.length + (posts.length === 1 ? " post" : " posts");
      list.innerHTML = posts.length ? posts.map(function (post) {
        return '<article class="feed-post"><div><span class="post-type">' + escapeHTML(post.type) + "</span><p>" + escapeHTML(post.time || "Sample") + "</p></div><div><h2>" + escapeHTML(post.material) + "</h2><p>" + escapeHTML(post.amount) + "</p></div><span class=\"feed-town\">⌖ " + escapeHTML(post.town) + "</span></article>";
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
    const title = isRegister ? "Create a demo profile." : "Sign in to the demo.";
    app.innerHTML = '<div class="auth-page"><a class="brand" href="index.html"><img class="brand-mark" src="../assets/mark.svg" alt=""><span>Tatag<span class="brand-light">Marinduque</span></span></a><section class="auth-panel"><div><p class="eyebrow eyebrow-dark">' + (isRegister ? "JOIN THE DIRECTORY" : "WELCOME BACK") + ' <span class="heading-line"></span></p><h1>' + title + '</h1><p>This is a local-only demo. It does not create a secure account or send data anywhere.</p></div><form class="post-form" id="auth-form">' + (isRegister ? '<label>Your name<input name="name" required maxlength="100" autocomplete="name"></label>' : "") + '<label>Email address<input name="email" required type="email" maxlength="254" autocomplete="email"></label>' + (isRegister ? '<label>Demo role<select name="role"><option value="buyer">Buyer</option><option value="vendor">Maker / vendor</option><option value="officer">Reviewer (demo only)</option></select></label>' : "") + '<button class="button button-dark" type="submit">' + (isRegister ? "Create demo profile" : "Continue") + ' <span>→</span></button><p class="form-note">Do not enter a password or real sensitive information. This demo stores only the name, email, and selected role in this browser.</p><div id="auth-status" class="status-region" role="status" aria-live="polite"></div></form><p class="auth-switch">' + (isRegister ? "Already set up this browser?" : "New to TatagMarinduque?") + ' <a href="' + (isRegister ? "login.html" : "register.html") + '">' + (isRegister ? "Sign in" : "Create a demo profile") + '</a></p><a class="text-link" href="index.html">← Back to home</a></section></div>';
    document.getElementById("auth-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const existing = currentUser();
      const user = isRegister
        ? { name: String(fields.get("name")).trim(), email: String(fields.get("email")).trim(), role: String(fields.get("role")) }
        : existing || { name: String(fields.get("email")).split("@")[0], email: String(fields.get("email")).trim(), role: "buyer" };
      if (!isRegister && existing && existing.email.toLowerCase() !== String(fields.get("email")).trim().toLowerCase()) {
        document.getElementById("auth-status").innerHTML = '<p class="inline-message" role="alert">This demo browser has a different profile saved. Use the same email or sign out first.</p>';
        return;
      }
      try {
        writeStorage(STORAGE.user, user);
        location.href = user.role === "officer" ? "officer.html" : user.role === "vendor" ? "dashboard.html" : "directory.html";
      } catch (error) {
        document.getElementById("auth-status").innerHTML = '<p class="inline-message" role="alert">Could not save the demo profile: ' + escapeHTML(error.message) + "</p>";
      }
    });
  }

  function renderMaker() {
    const id = new URLSearchParams(location.search).get("id");
    const maker = data.vendors.find(function (vendor) { return vendor.id === id; });
    if (!maker) {
      app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">MAKER PROFILE</p><h1>Profile not found.</h1><p>This sample profile is not available. Browse the directory for available makers.</p><a class="button button-dark" href="directory.html">Browse makers <span>→</span></a></section>' + footer() + "</div>";
      return;
    }
    const status = vendorStatus(maker);
    app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="profile-layout"><div class="profile-image"><img src="../assets/maker-goods.svg" alt="' + escapeHTML(maker.product) + ' illustration"><span>' + escapeHTML(status === "verified" ? "Verified sample" : status === "rejected" ? "Rejected sample" : "Pending sample") + "</span></div><div class=\"profile-details\"><p class=\"eyebrow eyebrow-dark\">" + escapeHTML(maker.category.toUpperCase()) + ' <span class="heading-line"></span></p><h1>' + escapeHTML(maker.name) + '</h1><p class="profile-town">⌖ ' + escapeHTML(maker.town) + ', Marinduque</p><p class="profile-description">' + escapeHTML(maker.description) + '</p><div class="profile-detail-row"><span>PRODUCT</span><strong>' + escapeHTML(maker.product) + '</strong></div><div class="profile-detail-row"><span>CAPACITY</span><strong>' + escapeHTML(maker.capacity) + '</strong></div><div class="profile-detail-row"><span>CERTIFICATIONS</span><strong>Not provided in sample data</strong></div><div class="profile-detail-row"><span>CONTACT</span><strong>Not provided in sample data</strong></div>' + (status === "verified" ? '<a class="button button-dark profile-quote" href="quote.html?id=' + encodeURIComponent(maker.id) + '">Request a sample quote <span>→</span></a>' : '<p class="profile-unavailable">Quote requests are only shown for verified sample makers.</p>') + '<p class="sample-note"><span class="sample-note-dot"></span>Fictional sample profile. Not a real business or official verification.</p></div></section>' + footer() + "</div>";
  }

  function renderQuote() {
    const id = new URLSearchParams(location.search).get("id");
    const maker = data.vendors.find(function (vendor) { return vendor.id === id; });
    if (!maker || vendorStatus(maker) !== "verified") {
      app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="simple-hero"><p class="eyebrow eyebrow-dark">SAMPLE QUOTE</p><h1>Quote request unavailable.</h1><p>Choose an available verified sample maker from the directory.</p><a class="button button-dark" href="directory.html">Browse makers</a></section>' + footer() + "</div>";
      return;
    }
    app.innerHTML = '<div class="simple-page">' + header("directory", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">SAMPLE QUOTE REQUEST <span class="heading-line"></span></p><h1>Start a conversation.</h1></div><p>This preview is saved in this browser only. It will not be sent to the maker.</p></div><div class="bulletin-layout"><section class="dashboard-card"><h2>' + escapeHTML(maker.name) + "</h2><p>" + escapeHTML(maker.product) + " · " + escapeHTML(maker.town) + "</p><p>" + escapeHTML(maker.capacity) + '</p><form class="post-form" id="quote-form"><label>Your name<input name="name" required maxlength="100"></label><label>Email address<input name="email" type="email" required maxlength="254"></label><label>Quantity requested<input name="quantity" required maxlength="80" placeholder="For example, 20 boxes"></label><label>Message<textarea name="message" maxlength="1000" placeholder="Optional details"></textarea></label><button class="button button-dark" type="submit">Save sample request <span>→</span></button><div id="quote-status" class="status-region" role="status" aria-live="polite"></div></form></section><aside class="post-form-wrap"><p class="eyebrow eyebrow-dark">BEFORE YOU CONTINUE</p><h2>Demo only.</h2><p>No message or contact information is transmitted. Do not enter real personal information. Sample makers are fictional.</p></aside></div></section>' + footer() + "</div>";
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
    app.innerHTML = '<div class="simple-page">' + header("", true) + '<section class="page-wrap"><div class="page-heading"><div><p class="eyebrow eyebrow-dark">BROWSER-ONLY DASHBOARD <span class="heading-line"></span></p><h1>Hello, <em>' + escapeHTML(user.name) + ".</em></h1></div><button class=\"sign-out\" id=\"sign-out\" type=\"button\">Sign out</button></div><div class=\"dashboard-grid\"><article class=\"dashboard-card\"><h2>Demo profile</h2><p><strong>Name</strong> · " + escapeHTML(user.name) + "</p><p><strong>Email</strong> · " + escapeHTML(user.email) + "</p><p><strong>Role</strong> · " + escapeHTML(user.role) + '</p><p>This profile is stored only in this browser and is not protected by a real login.</p></article><article class="dashboard-card"><h2>Sample quote requests</h2><div id="dashboard-quotes">' + (myQuotes.length ? myQuotes.map(function (quote) {
      return '<article class="quote-item"><h3>' + escapeHTML(quote.vendorName) + "</h3><p>" + escapeHTML(quote.quantity) + " · " + escapeHTML(quote.createdAt) + "</p><p>" + escapeHTML(quote.name) + " (" + escapeHTML(quote.email) + ")</p></article>";
    }).join("") : '<p>No quote requests saved in this browser yet.</p>') + '</div><a class="text-link" href="directory.html">Browse sample makers →</a></article></div><p class="sample-note"><span class="sample-note-dot"></span>Do not use this prototype to store real personal or business information.</p></section>' + footer() + "</div>";
    document.getElementById("sign-out").addEventListener("click", function () {
      try {
        localStorage.removeItem(STORAGE.user);
        location.href = "index.html";
      } catch (error) {
        window.alert("Could not clear the demo profile: " + error.message);
      }
    });
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
      const pending = data.vendors.filter(function (vendor) { return vendorStatus(vendor) === "pending"; });
      list.innerHTML = pending.length ? pending.map(function (vendor) {
        return '<article class="review-card dashboard-card" data-review-id="' + escapeHTML(vendor.id) + '"><div class="vendor-topline">' + statusBadge("pending") + "<span>" + escapeHTML(vendor.category + " · " + vendor.town) + "</span></div><h2>" + escapeHTML(vendor.name) + "</h2><p>" + escapeHTML(vendor.description) + "</p><p><strong>Capacity:</strong> " + escapeHTML(vendor.capacity) + '</p><div class="officer-actions"><button class="button button-dark" type="button" data-review="verified">Mark sample verified</button><button class="reject-button" type="button" data-review="rejected">Reject sample</button></div></article>';
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
    maker: renderMaker,
    quote: renderQuote,
    dashboard: renderDashboard,
    officer: renderOfficer
  };

  try {
    if (!data || !Array.isArray(data.vendors)) throw new Error("Sample data did not load.");
    if (!renderers[page]) throw new Error("Unknown page: " + page);
    renderers[page]();
  } catch (error) {
    console.error("Could not render the static app:", error);
    app.innerHTML = '<section class="page-wrap"><div class="empty-state"><strong>The page could not be loaded.</strong><span>' + escapeHTML(error.message) + "</span></div></section>";
  }
}());
