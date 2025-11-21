// --- Globale Layout-Funktionen: Navigation + Footer laden --------------------

document.addEventListener("DOMContentLoaded", () => {

  // NAVIGATION LADEN ---------------------------------------------------------
  fetch("nav.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("layout-nav").innerHTML = html;
      initNavigation();
      markActivePage();
    })
    .catch(err => console.error("Fehler beim Laden der Navigation:", err));


  // FOOTER LADEN -------------------------------------------------------------
  fetch("footer.html")
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

  if (page === "" || !page.includes(".html")) {
    page = "index.html"; // Standard
  }

  document.querySelectorAll(".bgw-menu a").forEach(a => {
    if (a.getAttribute("href") === page) {
      a.classList.add("active");
    }
  });
}

