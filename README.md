# 🏥 Doctor Appointment Booking System with Admin and Doctor Panel – Microservices-Based Full Stack Application

This is a full-stack Doctor Appointment Booking System designed to streamline appointment scheduling between patients and doctors.
The project evolved from a monolithic backend into a microservices-oriented architecture, incorporating Redis caching, event-driven notification handling, and audit logging, while maintaining separate interfaces for **Patients**, **Doctors**, and **Admin**.
---

## ✨ Features

### Patient Features:
- Patient registration and login
- Browse and search doctors by specialization
- Book or cancel appointments
- View appointment history and upcoming schedules
- Secure online payments
- Responsive and user-friendly interface

### Doctor Panel Features:
- Doctor login and profile management
- Dashboard with overall statistics
- Manage availability and schedule time slots
- View and manage booked appointments

### Admin Panel Features:
- Admin login
- Add new doctor 
- Dashboard with overall statistics
- Manage appointments (View, Update, Cancel)

## Architecture Highlights
- Modular Backend Design (prepared for microservices)
- Event-driven communication between services
- Redis caching layer for performance optimization
- Notification Service for email-based user communication
- Audit Service for tracking important system events
- Designed with serverless deployment constraints in mind

## Tech Stack

### Frontend:

- React.js (with React Router)
- Tailwind CSS for UI styling
- Axios for API requests

### Backend:

- Node.js with Express.js
- MongoDB with Mongoose (for database management)
- JWT Authentication
- Multer for image uploads
- Razorpay integration for payments

## Microservices
### Notification Service
- Handles appointment booking, cancellation, and payment emails
### Audit Service
- Stores system events for traceability and debugging
  
## Caching & Messaging
### Redis (Upstash)
Used for caching:
- Doctor lists
- Dashboards
- Appointment data
Reduces database load and improves response time

### Additional Tools:

- Cloudinary (for image storage)
- dotenv (for environment variables management)
- Bcrypt (for password hashing)
- Cors (for handling cross-origin requests)

## Redis Usage
Redis is used as a performance optimization layer:
### Cache frequently accessed data such as:
- Doctor listings
- User appointments
- Doctor and admin dashboards
### Cache invalidation is handled on:
- Appointment booking
- Appointment cancellation
- Profile updates
### Distributed locking:
- Appointment slot locking to prevent double booking
### The system is designed so that:
- Redis failures do not break core functionality
- Database is always the fallback source of truth

## Notification & Audit System
### Backend publishes events like:
- APPOINTMENT_BOOKED
- APPOINTMENT_CANCELLED
- PAYMENT_SUCCESS
### Notification service listens to these events and sends emails
### Audit service stores all events for tracking and debugging
### Designed to work reliably in a serverless environment (Vercel)

## Setup Instructions

### Prerequisites:

- Node.js and npm installed
- MongoDB installed or a cloud MongoDB database (MongoDB Atlas)
- Redis (Upstash recommended)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abhishekrajsingh25/Prescripto-Doctor.git
   cd Prescripto-Doctor
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```
   
4. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin
   npm install
   ```
  
5. **Install Notification Service Dependencies**
   ```bash
   cd ../notification-service
   npm install
   ```

6. **Install Audit Service Dependencies**
   ```bash
   cd ../audit-service
   npm install
   ```
   
7. **Environment Variables Setup**
   Create a .env file in the root directory of the backend with the following:
   ```bash
   MONGODB_URI = your_mongo_database_uri
   JWT_SECRET = your_jwt_secret_key
   CLOUDINARY_NAME=  your_cloudinary_cloud_name
   CLOUDINARY_API_KEY = your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY = your_cloudinary_api_secret
   ADMIN_EMAIL = admin_email_id
   ADMIN_PASSWORD = admin_password
   RAZORPAY_KEY_SECRET = your_razorpay_secret_key
   RAZORPAY_KEY_ID = your_razorpay_key_id
   CURRENCY = your_currency
   REDIS_URL=your_upstash_redis_url
   NOTIFICATION_SERVICE_URL=your_notification_service_url
   AUDIT_SERVICE_URL=your_audit_service_url
   ```

8. **Environment Variables Setup**
   Create a .env file in the root directory of the frontend with the following:
   ```bash
   VITE_BACKEND_URL = "http://localhost:4000"
   VITE_RAZORPAY_KEY_ID = your_razorpay_key_id
   ```
   
9. **Environment Variables Setup**
   Create a .env file in the root directory of the admin panel with the following:
   ```bash
   VITE_BACKEND_URL = "http://localhost:4000"
   ```

9. **Environment Variables Setup**
   Create a .env file in the root directory of the notification service with the following:
   ```bash
   PORT=5001
    MONGODB_URI=your_url

    BREVO_USERNAME=your_name
    BREVO_PASSWORD=your_pass
    BREVO_FROM_EMAIL=your_gmail
   ```

9. **Environment Variables Setup**
   Create a .env file in the root directory of the audit service with the following:
   ```bash
   PORT=5002
   DATABASE_URL=your_url
   ```
   
### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server should now be running on `http://localhost:4000`.

2. **Start the Frontend**
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend should now be running on `http://localhost:5173`.

3. **Start the Admin Panel**
   ```bash
   cd ../admin
   npm run dev
   ```
   The admin panel should now be running on `http://localhost:5174`.

4. **Start the Notification Service**
   ```bash
   cd ../notification-service
   npm run dev
   ```
   The notification-service should now be running on `http://localhost:5001`.

5. **Start the Audit Service**
   ```bash
   cd ../audit-service
   npm run dev
   ```
   The audit-service should now be running on `http://localhost:5002`.

## Deployment

- The frontend can be deployed using Vercel.
- The backend can be deployed using Vercel.
- The admin can be deployed using Vercel.
- MongoDB can be hosted on MongoDB Atlas.
- Redis can be hosted on Upstash

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

---

Feel free to contribute, suggest features, or open issues.

---

Thank you for visiting. I hope you find my work interesting and valuable! To see the Website. 
- For Frontend, Click <a href="https://prescripto-doctor-abhishek.vercel.app/" >Here</a>.
- For Admin, Click <a href="https://prescripto-doctor-admin-abhishek.vercel.app/" >Here</a>.
