const admin = require("firebase-admin");
const serviceAccount = require("./word-relay-960e7-firebase-adminsdk-ra0r4-6498a14f91.json");
const dotenv = require("dotenv");

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require("./api"),
};
