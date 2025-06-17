CarVioGo - Car Rental System
CarVioGo is a modern, full-featured car rental platform designed to provide a seamless and user-friendly experience for both car owners and renters. This project allows users to list their cars for rent, manage their listings, and book available vehicles with ease.

Live URL: https://carviogo.web.app/

Key Features
User Authentication: Secure user registration and login system using Firebase Authentication, including email/password and Google social login.

Private Routes: Protected routes to ensure that only authenticated users can access sensitive pages like "Add Car," "My Cars," and "My Bookings."

Car Management (for owners):

Add Cars: Authenticated users can add new cars to the platform with detailed information.

Update Cars: Users can edit the details of their listed cars through a user-friendly modal.

Delete Cars: Users can remove their car listings after a confirmation prompt.

My Cars Page: A dedicated page for users to view and manage all the cars they have listed, presented in a clear tabular format.

Car Booking (for renters):

Available Cars Page: Browse all available cars in both grid and list views.

Sorting & Filtering: Sort cars by price (low to high / high to low) and date added. Search for cars by model, brand, or location.

Car Details: View comprehensive details for each car before booking.

Booking System: A straightforward booking process with a confirmation modal.

My Bookings Page: A private page for users to view their booking history, with options to modify the booking date or cancel a booking.

Responsive Design: A fully responsive and mobile-friendly interface, ensuring a great user experience on desktops, tablets, and mobile devices.

Interactive UI: Features like hover effects, modals for actions, and toast/modal notifications for user feedback.

Custom 404 Page: A user-friendly error page to handle invalid URLs.

Technologies & npm Packages Used
This project was built using the following technologies and packages:

Framework: React.js

Routing: React Router DOM

Styling: Tailwind CSS, DaisyUI

Authentication: Firebase

HTTP Client: Axios (for communicating with the backend API)

Notifications: React Hot Toast / SweetAlert2

Icons: React Icons

Getting Started Locally
To run this project on your local machine, follow these steps:

Clone the repository:

git clone <your-repository-url>

Navigate to the project directory:

cd carviogo-client

Install the dependencies:

npm install

Set up environment variables:
Create a .env.local file in the root of the project and add your Firebase configuration keys:

VITE_APIKEY=your_firebase_apikey
VITE_AUTHDOMAIN=your_firebase_authdomain
VITE_PROJECTID=your_firebase_projectid
VITE_STORAGEBUCKET=your_firebase_storagebucket
VITE_MESSAGINGSENDERID=your_firebase_messagingsenderid
VITE_APPID=your_firebase_appid

Run the development server:

npm run dev

The application will be available at http://localhost:5173.
