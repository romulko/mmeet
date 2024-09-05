import * as firebase from 'firebase-admin';
import * as certJson from './cert/cert.json';

export const app = firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: certJson.project_id,
    privateKey: certJson.private_key,
    clientEmail: certJson.client_email,
  }),
});
