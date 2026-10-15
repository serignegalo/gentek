// Numéro WhatsApp de GenTek Africa, au format international sans + ni espaces
var NUMERO_WHATSAPP = "221776449984";

var boutonMenu = document.getElementById("bouton-menu");
var menu = document.getElementById("menu");
boutonMenu.addEventListener("click", function () {
  var ouvert = menu.classList.toggle("ouvert");
  boutonMenu.setAttribute("aria-expanded", ouvert ? "true" : "false");
});
menu.querySelectorAll("a").forEach(function (lien) {
  lien.addEventListener("click", function () {
    menu.classList.remove("ouvert");
    boutonMenu.setAttribute("aria-expanded", "false");
  });
});

var formulaire = document.getElementById("formulaire");
var recap = document.getElementById("recap");
var recapTexte = document.getElementById("recap-texte");
var erreur = document.getElementById("erreur");

formulaire.addEventListener("submit", function (e) {
  e.preventDefault();
  var v = function (id) { return document.getElementById(id).value.trim(); };
  if (!v("nom") || !v("telephone") || !v("message")) { erreur.hidden = false; recap.hidden = true; return; }
  erreur.hidden = true;
  var lignes = [
    "Demande de devis – GenTek Africa",
    "Nom : " + v("nom"),
    v("entreprise") ? "Entreprise : " + v("entreprise") : "",
    "Téléphone : " + v("telephone"),
    v("email") ? "E-mail : " + v("email") : "",
    "Domaine : " + v("domaine"),
    "Besoin : " + v("message")
  ].filter(Boolean).join("\n");
  recapTexte.textContent = lignes;
  document.getElementById("lien-whatsapp").href = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(lignes);
  recap.hidden = false;
});

document.getElementById("copier").addEventListener("click", function () {
  var bouton = this;
  function selectionner() {
    var plage = document.createRange();
    plage.selectNodeContents(recapTexte);
    var sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(plage);
    bouton.textContent = "Texte sélectionné";
  }
  try {
    navigator.clipboard.writeText(recapTexte.textContent).then(function () { bouton.textContent = "Texte copié"; }, selectionner);
  } catch (err) { selectionner(); }
});
