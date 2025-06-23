# Modern Expense Tracker

A beautiful and modern expense tracking web application built with ReactJS and Firebase.

## Features

- 🔐 **User Authentication** - Secure login/signup with Firebase Auth
- 💰 **Expense Management** - Add, edit, delete, and categorize expenses
- 📊 **Visual Dashboard** - Interactive charts and spending insights
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 🌙 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - Live data synchronization with Firestore

## Tech Stack

- **Frontend**: ReactJS, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore + Authentication)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Setup Instructions

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Firebase Configuration**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `.env`:

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

3. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /expenses/{document} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
       }
     }
   }
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.js     # Analytics dashboard
│   ├── ExpenseForm.js   # Add/edit expense modal
│   ├── ExpenseList.js   # List of expenses
│   └── Layout.js        # App layout with navigation
├── contexts/            # React contexts
│   ├── AuthContext.js   # Authentication state
│   └── ThemeContext.js  # Theme management
├── pages/               # Main pages
│   ├── Auth.js          # Login/signup page
│   └── Home.js          # Main dashboard page
├── utils/               # Utility functions
│   └── firebase.js      # Firebase configuration
├── App.js               # Main app component
├── index.js             # Entry point
└── index.css            # Global styles
```

## Features Overview

### Authentication
- Email/password authentication
- Secure user sessions
- Protected routes

### Expense Management
- Add expenses with title, amount, category, and date
- Edit existing expenses
- Delete expenses
- Real-time synchronization

### Dashboard Analytics
- Total spending overview
- Category-wise breakdown (pie chart)
- Monthly spending trends (bar chart)
- Quick statistics cards

### UI/UX
- Glassmorphism design aesthetic
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Dark/light mode toggle
- Toast notifications for user feedback

## Usage

1. **Sign Up/Login** - Create an account or sign in
2. **Add Expenses** - Click "Add Expense" to record new expenses
3. **View Dashboard** - See your spending analytics and trends
4. **Manage Expenses** - Edit or delete expenses from the list
5. **Filter & Search** - Find specific expenses easily

## Deployment

The app can be deployed to any static hosting service:

```bash
npm run build
```

Deploy the `build` folder to services like:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.