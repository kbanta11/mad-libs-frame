import admin from 'firebase-admin';

const serviceAccount = require('../../../firebase-admin-key.json');
if (admin.apps.length === 0) {
    admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
}
export const db = admin.firestore();