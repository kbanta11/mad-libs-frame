import admin from 'firebase-admin';
import serviceAccount from '../../../firebase-admin-key';

if (admin.apps.length === 0) {
    admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
}
export const db = admin.firestore();