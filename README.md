# CarvioGO - Modern Car Rental Platform

<div align="center">

![CarvioGO Logo](https://img.shields.io/badge/CarvioGO-Drive%20Your%20Dreams-blue?style=for-the-badge&logo=car)

**A modern, full-featured car rental platform designed to provide a seamless and user-friendly experience for both car owners and renters.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Website-green?style=for-the-badge&logo=firebase)](https://carviogo.web.app/)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20Firebase%20%7C%20Tailwind-blue?style=for-the-badge)](https://carviogo.web.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🚀 Live Demo

**🌐 Live Website:** [https://carviogo.web.app/](https://carviogo.web.app/)

---

## ✨ Key Features

### 🎨 **Modern Design & UX**
- **Beautiful UI/UX**: Modern gradient backgrounds, glass morphism effects, and smooth animations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth transitions, and engaging animations
- **Loading States**: Elegant loading components throughout the application

### 🔐 **Authentication & Security**
- **Firebase Authentication**: Secure user registration and login
- **Google Sign-In**: One-click Google authentication integration
- **Protected Routes**: Private pages accessible only to authenticated users
- **JWT Token Management**: Secure token-based authentication system

### 🚗 **Car Management System**
- **Add Cars**: Comprehensive car listing with detailed information
- **Car Details**: Rich car information display with images and specifications
- **Update/Delete**: Easy car management with modal-based editing
- **My Cars**: Personal dashboard for managing listed vehicles

### 📅 **Booking System**
- **Available Cars**: Browse all available cars with search and filtering
- **Booking Management**: Simple booking process with confirmation
- **My Bookings**: Track booking history and manage reservations
- **Real-time Updates**: Instant booking status updates

### 🎯 **Advanced Features**
- **Search & Filter**: Advanced search by model, brand, or location
- **Sorting Options**: Sort by price, date, and availability
- **Grid/List Views**: Toggle between different viewing modes
- **Special Offers**: Featured promotions and deals section

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with authentication
│   ├── Hero.jsx        # Hero section with animations
│   ├── Features.jsx    # Feature showcase
│   ├── CarCard.jsx     # Car display cards
│   ├── Footer.jsx      # Footer component
│   ├── Loading.jsx     # Loading animations
│   └── ...
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Authentication pages
│   ├── Registration.jsx
│   ├── AddCar.jsx      # Car management
│   ├── MyCars.jsx      # User's cars
│   ├── AvailableCars.jsx # Browse cars
│   ├── CarDetails.jsx  # Detailed car view
│   ├── BookingPage.jsx # Booking management
│   └── ErrorPage.jsx   # 404 error page
├── config/             # Configuration files
│   └── api.js         # API configuration
├── provider/           # Context providers
│   ├── AuthProvider.jsx # Authentication context
│   └── PrivateRoute.jsx # Route protection
├── routes/             # Routing configuration
│   └── routes.jsx      # Application routes
├── firebase/           # Firebase configuration
│   └── firebase.config.js
└── assets/             # Static assets
    ├── images/
    └── animations/
```

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **DaisyUI** - Component library for Tailwind CSS
- **React Icons** - Popular icon library

### **Authentication & Backend**
- **Firebase** - Authentication and backend services
- **Firebase Auth** - User authentication system
- **Custom API** - RESTful API for car management

### **Additional Libraries**
- **SweetAlert2** - Beautiful, responsive, customizable alerts
- **React DatePicker** - Date selection component
- **Lottie React** - Animation library for React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/carvio-go.git
   cd carvio-go
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   
   # API Configuration
   VITE_API_URL=https://carvio-go-server.vercel.app
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📱 Key Pages & Features

### 🏠 **Home Page**
- **Hero Section**: Animated banner with typewriter effect
- **Features Showcase**: Key platform features with icons
- **Recent Cars**: Latest car listings
- **Customer Reviews**: User testimonials
- **Special Offers**: Promotional content

### 🔐 **Authentication Pages**
- **Login**: Email/password and Google sign-in
- **Registration**: User registration with validation
- **Protected Routes**: Secure access to user-specific features

### 🚗 **Car Management**
- **Add Car**: Comprehensive car listing form
- **My Cars**: Personal car dashboard with CRUD operations
- **Available Cars**: Browse and search all cars
- **Car Details**: Detailed car information and booking

### 📅 **Booking System**
- **Book Car**: Simple booking process
- **My Bookings**: Booking history and management
- **Booking Status**: Real-time booking updates

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue gradients (#3B82F6 to #8B5CF6)
- **Secondary**: Purple gradients (#8B5CF6 to #EC4899)
- **Accent**: Yellow (#F59E0B)
- **Neutral**: Gray scale (#F9FAFB to #111827)

### **Typography**
- **Headings**: Bold, gradient text with modern fonts
- **Body**: Clean, readable typography
- **Interactive**: Hover effects and smooth transitions

### **Components**
- **Cards**: Glass morphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Modern input fields with validation
- **Modals**: Elegant overlay dialogs

---

## 🔧 API Configuration

The application uses a centralized API configuration that handles both development and production environments:

```javascript
// Development: Uses Vite proxy (/api/...)
// Production: Uses full URL (https://carvio-go-server.vercel.app/...)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://carvio-go-server.vercel.app';
```

### **API Endpoints**
- `POST /api/login` - User authentication
- `GET /api/cars` - Get car listings
- `POST /api/cars` - Add new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car
- `GET /api/bookings` - Get bookings
- `PATCH /api/cars/:id/booking` - Book a car

---

## 🚀 Deployment

### **Firebase Deployment**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### **Environment Variables**

Make sure to set the following environment variables in Firebase Console:
- `VITE_API_URL` - Backend API URL
- Firebase configuration variables

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Firebase** for authentication and backend services
- **Tailwind CSS** for the amazing styling framework
- **React Community** for the excellent documentation
- **Framer Motion** for smooth animations
- **React Icons** for the beautiful icon library

---

<div align="center">

**Made with ❤️ by CarvioGO Team**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?style=social&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=social&logo=linkedin)](https://linkedin.com/in/yourusername)

</div>
