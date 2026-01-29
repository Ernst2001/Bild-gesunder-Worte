// --- Globale Layout-Funktionen: Navigation + Footer laden --------------------

document.addEventListener("DOMContentLoaded", () => {

  const isDE = location.pathname.includes("/de/");
  const navFile = isDE ? "/layout/nav.html" : "/layout/nav_en.html";

  // --- NAVIGATION LADEN ---------------------------------------------------------
  fetch(navFile)
    .then(res => res.text())
    .then(html => {
      document.getElementById("layout-nav").innerHTML = html;
      initNavigation();
      markActivePage();
      document.body.style.opacity = "1";
    })
    .catch(err => console.error("Fehler beim Laden der Navigation:", err));



  
  // --- FOOTER LADEN -------------------------------------------------------------
  fetch("/layout/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("layout-footer").innerHTML = html;
     
      // Kontakttext
      const contactP = document.querySelector("#footer-contact");
      if (contactP) {
        contactP.innerHTML = isDE
          ? 'Kontakt: Bei Fragen und Anregungen sehr gerne an <a href="mailto:bildgesunderworte@gmail.com">bildgesunderworte@gmail.com</a>'
          : 'Contact: For questions and suggestions please reach out to <a href="mailto:bildgesunderworte@gmail.com">bildgesunderworte@gmail.com</a>';
      }

      // PayPal-Button
      const paypalBtn = document.querySelector("#footer-paypal-btn");
      if (paypalBtn) {
        paypalBtn.textContent = isDE
          ? "Unterstützen über PayPal"
          : "Support via PayPal";
      }

    const year = new Date().getFullYear();
    const c = document.querySelector("#footer-copyright");
    if (c) {
      c.textContent = isDE
        ? `© ${year} bildgesunderworte. Inhalte und Musikaufnahmen dieser Website unterliegen dem Urheberrecht.`
        : `© ${year} bildgesunderworte. Content and music recordings on this website are subject to copyright.`;
    }
      
      // Impressum / Datenschutz
      const legalLink = document.querySelector("#footer-legal");
      const privacyLink = document.querySelector("#footer-privacy");

      if (legalLink && privacyLink) {
        if (isDE) {
          legalLink.textContent = "Impressum";
          legalLink.href = "/de/impressum.html";
          privacyLink.textContent = "Datenschutz";
          privacyLink.href = "/de/datenschutz.html";
        } else {
          legalLink.textContent = "Legal Notice";
          legalLink.href = "/en/legal_en.html";
          privacyLink.textContent = "Privacy Policy";
          privacyLink.href = "/en/privacy_en.html";
        }
      }

    })
    .catch(err => console.error("Fehler beim Laden des Footers:", err));





// --- Navigation initialisieren (Burger-Menü etc.) ---------------------------

function initNavigation() {
  const burger = document.querySelector(".bgw-burger");
  const menu   = document.querySelector(".bgw-menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
}


// --- Aktiven Menüpunkt markieren --------------------------------------------

function markActivePage() {
  let page = location.pathname.split("/").pop();
  if (!page) page = "index.html";

  document.querySelectorAll(".bgw-menu a").forEach(a => {
    const href = a.getAttribute("href").split("/").pop(); // nur Dateiname vergleichen
    if (href === page) a.classList.add("active");
  });



 // --- Sprachumschaltung mit Mapping ---
  const langLinks = document.querySelectorAll(".language-switch a");

  // Mapping für Seiten, deren englischer Dateiname anders ist
  const pageMap = {
    "index.html": "index_en.html",
    "projekt.html": "project_en.html",
    "grundlagen.html": "basics_en.html",
    "timeline.html": "timeline_en.html",
    "faq.html": "faq_en.html",
    "youtube.html": "youtube_en.html",
    "quellen.html": "sources_en.html",
    "kontakt.html": "contact_en.html",
    "unterstuetzen.html": "support_en.html",
    "impressum.html": "legal_en.html",
    "datenschutz.html": "privacy_en.html"
  };

  langLinks.forEach(a => {
    if (a.getAttribute("href").includes("/de/")) {
      // Deutsch: suche passenden deutschen Key
      const deFile = Object.keys(pageMap).find(key => pageMap[key] === page) || page;
      a.href = "/de/" + deFile;
      if (location.pathname.includes("/de/")) a.classList.add("active-lang");
    } else if (a.getAttribute("href").includes("/en/")) {
      // Englisch: benutze Mapping oder fallback auf _en
      a.href = "/en/" + (pageMap[page] || page.replace(".html","") + "_en.html");
      if (location.pathname.includes("/en/")) a.classList.add("active-lang");
    }
  });
}

});

// --- Sichtbarkeit erzwingen, falls fetch fehlschlägt --------------------------
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
