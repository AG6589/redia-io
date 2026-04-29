# 🛍️ ProShop - Modern MERN E-Commerce Storefront

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://www.mongodb.com/mern-stack)
[![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ProShop is a high-fidelity, full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium, responsive UI, robust state management with Redux Toolkit, and a powerful Admin Dashboard for inventory and order management.

![Storefront Mockup](https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## ✨ Key Features

### 👤 User Features
- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS and Lucide icons.
- **JWT Authentication**: Secure login and registration with token-based authentication.
- **Dynamic Catalog**: Browse products by category, keyword search, and real-time filtering.
- **Smart Cart**: Add/remove items, update quantities, and persistent storage.
- **Secure Checkout**: Shipping details, payment method selection, and order summary.
- **Order Tracking**: Visual status tracker (Order Placed -> Paid -> Shipped -> Delivered).
- **Profile Management**: Update user details and view complete order history.

### 🛡️ Admin Features
- **Admin Dashboard**: Overview of store performance and management.
- **Inventory Control**: Create, update, and delete products with image support.
- **Order Management**: View all customer orders and manually update status (Mark as Paid/Delivered).
- **User Management**: View and manage all registered users.

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Redux Toolkit, React Router DOM, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.
- **Notifications**: React-Toastify for beautiful, non-blocking alerts.

## 📂 Project Structure

### 🏗️ Directory Tree
```text
redia-io/
├── backend/                # Express & Node.js Server
│   ├── config/             # Database connection
│   ├── controllers/        # Route logic
│   ├── data/               # Seed data (products, users)
│   ├── middlewares/        # Auth & Error handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── utils/              # Helper functions (JWT)
│   └── server.js           # Entry point
└── frontend/               # React.js (Vite)
    ├── src/
    │   ├── assets/         # Static images/fonts
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Full page views
    │   ├── slices/         # Redux Toolkit logic (RTK Query)
    │   ├── App.jsx         # Routes & Layout
    │   └── main.jsx        # App entry
    └── tailwind.config.js  # Styling configuration
```

### 🔄 Data & Application Flow
1. **Frontend Request**: React components initiate API calls via **RTK Query** slices.
2. **Middleware**: Requests pass through **JWT Protect** middleware to verify user identity.
3. **Routing**: Express Router directs the request to the specific **Controller**.
4. **Data Logic**: Controllers interact with **Mongoose Models** to query/update MongoDB.
5. **Response**: Backend sends a JSON response back to the frontend.
6. **State Update**: Redux automatically caches and updates the UI based on the response.


## 🛠️ Installation & Setup

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd redia-io
\`\`\`

### 2. Backend Configuration
Create a \`.env\` file in the \`backend/\` directory:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
\`\`\`

### 3. Frontend Configuration
The frontend is pre-configured to proxy API requests to \`http://localhost:5000\`.

### 4. Install Dependencies
\`\`\`bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### 5. Seeding Data (Optional)
To populate the database with sample products and users:
\`\`\`bash
cd backend
npm run data:import
\`\`\`

### 6. Run the Application
\`\`\`bash
# Run both frontend & backend concurrently
# (Make sure you have concurrently installed or run in separate terminals)

# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
\`\`\`

## 📸 Screenshots

| Home Page | Order Tracker | Admin Dashboard |
| :--- | :--- | :--- |
| ![Home](https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=300) | ![Tracker](https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=300) | ![Admin](https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300) |

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [Antigravity AI](https://github.com/google-deepmind)
