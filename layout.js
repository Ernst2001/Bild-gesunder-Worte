// Layout laden + Fade-in
window.addEventListener("DOMContentLoaded", async () => {
  // NAVIGATION
  const navHtml = await fetch("layout/nav.html").then(r => r.text());
  document.getElementById("layout-nav").innerHTML = navHtml;

  // FOOTER
  const footerHtml = await fetch("layout/footer.html").then(r => r.text());
  document.getElementById("layout-footer").innerHTML = footerHtml;

  // Menü aktivieren
  activateMenu();

  // Fade-in
  document.body.style.opacity = "1";
});

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
