# Portfolio Website with Firebase Backend

A modern Angular 21 portfolio website with Firebase Firestore backend, Cloud Functions, and a contact form that saves submissions to Firestore and sends email notifications.

## Features

- ✅ Angular 21 standalone components with Server-Side Rendering (SSR)
- ✅ Responsive contact form (Reactive Forms)
- ✅ Firebase Firestore integration for storing contact submissions
- ✅ Firestore-triggered Cloud Function that sends email notifications
- ✅ Firebase Emulator Suite for local development (Firestore, Functions, Hosting)
- ✅ Security rules for Firestore (permissive for emulator, customize for production)
- ✅ Ready to deploy to Firebase Hosting

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── app.ts                       # Root component
│   │   ├── app.html                     # Root template
│   │   ├── app.routes.ts                # App routing (includes /contact)
│   │   ├── contact/
│   │   │   ├── contact.component.ts     # Contact form component
│   │   │   ├── contact.component.html   # Contact form template
│   │   │   └── contact.component.scss   # Contact form styles
│   │   └── services/
│   │       └── firebase.service.ts      # Firebase initialization & Firestore writes
│   ├── environments/
│   │   ├── environment.ts               # Dev Firebase config (placeholders)
│   │   └── environment.prod.ts          # Prod Firebase config (placeholders)
│   ├── main.ts                          # App bootstrap
│   ├── main.server.ts                   # SSR bootstrap
│   └── styles.scss                      # Global styles
├── functions/
│   ├── index.js                         # Cloud Function: email notification on new contact
│   └── package.json                     # Functions dependencies
├── firebase.json                        # Firebase config (emulators, hosting, rules)
├── firestore.rules                      # Firestore security rules
├── .firebaserc                          # Firebase project config
├── .nvmrc                               # Node version (24)
├── angular.json                         # Angular CLI config
├── tsconfig.json                        # TypeScript config
└── package.json                         # Root dependencies & scripts
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install functions dependencies
cd functions && npm install && cd ..
```

### 2. Configure Firebase (Required)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (e.g., "demo-portfolio")
3. Enable Firestore Database (in Firestore tab)
4. Get your Firebase config from Project Settings
5. Update `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your config:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

6. Update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "YOUR_PROJECT"
  }
}
```

### 3. Run Locally with Emulators

Open two terminal tabs:

**Tab 1: Start Firebase Emulators**

```bash
npm run emulate:firebase
```

This starts:
- Firestore Emulator: `http://127.0.0.1:8080`
- Functions Emulator: `http://127.0.0.1:5001`
- Hosting Emulator: `http://127.0.0.1:5002`
- **Emulator UI**: `http://127.0.0.1:4000/`

**Tab 2: Start Angular Dev Server**

```bash
npm start
```

Visit `http://localhost:4200/` and navigate to `/contact` to test the form.

## Development Commands

```bash
# Start Angular dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode (rebuild on changes)
npm watch

# Start Firebase emulators
npm run emulate:firebase

# View Firebase emulator UI
open http://127.0.0.1:4000/
```

## Email Notifications Setup

The Cloud Function `sendContactNotification` automatically sends an email when a new contact form is submitted.

### For Development (Emulator)

By default, emails are logged to the console. No extra setup needed.

### For Production

To send real emails, set these environment variables before deploying:

```bash
# Using Gmail with App Password
export GMAIL_USER="your-email@gmail.com"
export GMAIL_PASSWORD="your-app-password"
export ADMIN_EMAIL="admin@yoursite.com"

# Deploy functions with these secrets
firebase deploy --only functions
```

Or use Firebase Secret Manager:

```bash
# Create secrets in Firebase
firebase functions:config:set gmail.user="your-email@gmail.com"
firebase functions:config:set gmail.password="your-app-password"
firebase functions:config:set admin.email="admin@yoursite.com"

# Deploy
firebase deploy --only functions
```

## Deployment

### Deploy to Firebase Hosting & Cloud Functions

```bash
# Deploy everything (hosting + functions)
npm run deploy

# Or deploy only functions
npm run deploy:functions

# Or deploy only hosting
firebase deploy --only hosting
```

### First-Time Deployment Setup

1. Initialize Firebase in your project (already done):
   ```bash
   firebase init
   ```

2. Ensure your project ID is set in `.firebaserc`

3. Build the Angular app:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Firestore Security Rules

The `firestore.rules` file defines access control:

- ✅ **Anyone can read** all documents
- ✅ **Anyone can create** documents in the `contacts` collection

**For production**, update `firestore.rules` to be more restrictive:

```firestore-security-rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Require authentication for all operations
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // Allow public contact form submissions
    match /contacts/{document=**} {
      allow create: if request.resource.data.name != null &&
                       request.resource.data.email != null &&
                       request.resource.data.message != null;
    }
  }
}
```

Then redeploy:

```bash
firebase deploy --only firestore:rules
```

## Troubleshooting

### Emulator Issues

**Firebase CLI not found:**
```bash
npm install -g firebase-tools
firebase login
```

**Java not found (Firestore emulator):**
```bash
# macOS with Homebrew
brew install --cask temurin

# Or download from https://adoptium.net/
```

**Port already in use:**
Edit `firebase.json` to change emulator ports (default: 8080 for Firestore, 5001 for Functions).

### Angular Build Issues

**Firebase imports not resolving:**
Ensure `firebase` is in `dependencies` (not `optionalDependencies`) in `package.json`.

### Contact Form Not Submitting

1. Check browser console for errors
2. Verify Firebase config in `src/environments/environment.ts`
3. Ensure Firestore Emulator is running (or real Firestore if using production config)
4. Check Network tab in DevTools to see API requests

## Next Steps

- Customize the portfolio content in [src/app/app.html](src/app/app.html)
- Add more sections (projects, skills, about, etc.)
- Style with your brand colors (see [src/app/app.scss](src/app/app.scss))
- Add more routes to [src/app/app.routes.ts](src/app/app.routes.ts)
- Implement authentication if needed (Firebase Auth)
- Add file storage for portfolios/CV (Firebase Storage)

## Resources

- [Angular Docs](https://angular.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)

## License

MIT
