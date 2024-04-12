import { ServiceAccount } from "firebase-admin";

export default {
  "type": "service_account",
  "project_id": "frame-mad-libs",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": "firebase-adminsdk-11gtl@frame-mad-libs.iam.gserviceaccount.com",
  "client_id": "111244862294876517507",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
  "universe_domain": "googleapis.com"
} as ServiceAccount;
