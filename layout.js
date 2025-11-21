// Navigation & Footer laden
async function loadLayout() {
  // NAVIGATION
  const navHtml = await fetch("layout/nav.html").then(r => r.text());
  document.getElementById("layout-nav").innerHTML = navHtml;

  // FOOTER
  const footerHtml = await fetch("layout/footer.html").then(r => r.text());
  document.getElementById("layout-footer").innerHTML = footerHtml;

  activateMenu();
}

// Menü anzeigen / verstecken (Burger)
function toggleBGWMenu() {
  document.querySelector(".bgw-menu").classList.toggle("show");
}

// Aktive Seite markieren
function activateMenu() {
  let page = location.pathname.split("/").pop().replace(".html", "");
  if (page === "") page = "index";

  document.querySelectorAll(".bgw-menu a").forEach(a => {
    if (a.dataset.page === page) {
      a.classList.add("active");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadLayout();
});
