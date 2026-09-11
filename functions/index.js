const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { auth } = require("firebase-functions/v1");
const { onRequest } = require("firebase-functions/v2/https");

initializeApp();

// Attribution automatique du rôle aux nouveaux utilisateurs
exports.setSupabaseRoleClaim = auth.user().onCreate(async (user) => {
  await getAuth().setCustomUserClaims(user.uid, {
    role: "authenticated",
  });
});

// TEMPORAIRE : attribue le rôle à ton compte existant
exports.setupExistingUser = onRequest(async (req, res) => {
  try {
    await getAuth().setCustomUserClaims(
      "Svqhs49Ba2NDlNohxb0CEe1XUv53",
      { role: "authenticated" }
    );

    res.status(200).send("ROLE AJOUTE AVEC SUCCES");
  } catch (error) {
    console.error(error);
    res.status(500).send("ERREUR");
  }
});
