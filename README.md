# CarVioGo - Car Rental System

**CarVioGo** is a modern, full-featured car rental platform designed to provide a seamless and user-friendly experience for both car owners and renters. This project allows users to list their cars for rent, manage their listings, and book available vehicles with ease.

🔗 **Live URL:** [https://carviogo.web.app/](https://carviogo.web.app/)

---

## 🔑 Key Features

### 🔐 User Authentication
- Secure user registration and login using **Firebase Authentication**
- Supports **Email/Password** and **Google social login**

### 🔒 Private Routes
- Protected pages like `Add Car`, `My Cars`, and `My Bookings` accessible only to authenticated users

### 🚘 Car Management (for Owners)
- **Add Cars**: Add new car listings with detailed information
- **Update Cars**: Edit car details via a user-friendly modal
- **Delete Cars**: Remove listings after a confirmation prompt
- **My Cars Page**: View and manage all listed cars in a table format

### 🚗 Car Booking (for Renters)
- **Available Cars Page**: Browse all available cars in grid or list view
- **Sorting & Filtering**: 
  - Sort by price (Low → High / High → Low)
  - Filter by model, brand, or location
- **Car Details**: View full information before booking
- **Booking System**: Simple booking with confirmation modal
- **My Bookings Page**: View booking history with options to change date or cancel

### 📱 Responsive Design
- Fully responsive interface optimized for **desktops**, **tablets**, and **mobile devices**

### ✨ Interactive UI
- Hover effects, modals for actions, and toast/modal notifications for feedback

### 🚫 Custom 404 Page
- User-friendly page for handling invalid URLs

---

## 🚀 Auto-Push to GitHub

This project includes an automated Git push script that makes it easy to commit and push changes to GitHub.

### Quick Push
After making changes to your code, simply run:
```bash
npm run push
```

Or use the script directly:
```bash
./git-push.sh
```

### Custom Commit Message
You can also provide a custom commit message:
```bash
./git-push.sh "Your custom commit message"
```

### What the Script Does
1. ✅ Checks if you're in a Git repository
2. 📁 Shows which files have been changed
3. ➕ Adds all changes to staging
4. 💾 Commits with timestamp (or custom message)
5. 🚀 Pushes to GitHub automatically
6. 🔗 Provides feedback and repository link

### Features
- 🎨 Colored output for better readability
- ⏰ Automatic timestamps
- 🔍 Shows changed files before committing
- 🛡️ Error handling and validation
- 📊 Status feedback

---

## 🧰 Technologies & npm Packages Used

- **Framework**: React.js  
- **Routing**: React Router DOM  
- **Styling**: Tailwind CSS, DaisyUI  
- **Authentication**: Firebase  
- **HTTP Client**: Axios  
- **Notifications**: React Hot Toast, SweetAlert2  
- **Icons**: React Icons  

---

## 🛠 Getting Started Locally

### 1️⃣ Clone the repository:
```bash

### 2️⃣ Navigate to the project directory:
```bash
cd carviogo-client
```

### 3️⃣ Install dependencies:
```bash
npm install
```

### 4️⃣ Set up environment variables:

Create a `.env.local` file in the root directory and add your Firebase configuration keys:

```env
VITE_APIKEY=your_firebase_apikey  
VITE_AUTHDOMAIN=your_firebase_authdomain  
VITE_PROJECTID=your_firebase_projectid  
VITE_STORAGEBUCKET=your_firebase_storagebucket  
VITE_MESSAGINGSENDERID=your_firebase_messagingsenderid  
VITE_APPID=your_firebase_appid
```

### 5️⃣ Run the development server:
```bash
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)
