// --- Globale Layout-Funktionen: Navigation + Footer laden --------------------

document.addEventListener("DOMContentLoaded", () => {

  // NAVIGATION LADEN ---------------------------------------------------------
  fetch("/layout/nav.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("layout-nav").innerHTML = html;
      initNavigation();
      markActivePage();
    })
    .catch(err => console.error("Fehler beim Laden der Navigation:", err));

  // FOOTER LADEN -------------------------------------------------------------
  fetch("/layout/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("layout-footer").innerHTML = html;
    })
    .catch(err => console.error("Fehler beim Laden des Footers:", err));
});



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
}



// Ganz unten in layout.js oder in einem eigenen Script
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});


