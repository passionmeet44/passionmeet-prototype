const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

initializeApp();

getAuth()
  .setCustomUserClaims("Svqhs49Ba2NDlNohxb0CEe1XUv53", {
    role: "authenticated"
  })
  .then(() => console.log("ROLE AJOUTE AVEC SUCCES"))
  .catch((error) => console.error(error));
