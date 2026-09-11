const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { auth } = require("firebase-functions/v1");


initializeApp();

// Attribution automatique du rôle aux nouveaux utilisateurs
exports.setSupabaseRoleClaim = auth.user().onCreate(async (user) => {
  await getAuth().setCustomUserClaims(user.uid, {
    role: "authenticated",
  });
});

