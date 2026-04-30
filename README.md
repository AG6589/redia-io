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
```

### 5. Seeding Data (Crucial)
To populate the database with sample products and the default Admin user:
```bash
cd backend
npm run data:import
```

### 6. Run the Application
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

## 🔐 Admin Credentials
Use these credentials to access the Admin Panel:
- **Email:** `admin@example.com`
- **Password:** `123456`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (supports `keyword`, `category`, `pageNumber` query params)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product (Admin)
- `PUT /api/products/:id` - Update a product (Admin)
- `DELETE /api/products/:id` - Delete a product (Admin)

### Users
- `POST /api/users/login` - Auth user & get token
- `POST /api/users` - Register a new user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `GET /api/orders` - Get all orders (Admin)

## 📸 Screenshots

| Home Page | Order Tracker | Admin Dashboard |
<img width="1919" height="822" alt="image" src="https://github.com/user-attachments/assets/cbcd9549-1f29-4f9e-9bff-1cebeff6ec83" />
<img width="1911" height="905" alt="image" src="https://github.com/user-attachments/assets/42388a9e-055f-4864-93f6-6ee9a44680c2" />
<img width="1910" height="906" alt="image" src="https://github.com/user-attachments/assets/0652e5e8-048f-41ac-bba9-7a590c8136b3" />
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/dee1a287-332a-4356-8a4a-779d566d9c78" />
<img width="1919" height="921" alt="image" src="https://github.com/user-attachments/assets/9b18f19e-994a-4c14-a5e4-eba37540f207" />
<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/d02a8c09-143e-4b3a-bdd7-0af02647d5dc" />
<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/6b0cfe03-5b59-45c1-8ee1-73b40b220143" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/6d649602-5533-41cf-8dfa-e1e7ddb3bb5c" />
<img width="1919" height="825" alt="image" src="https://github.com/user-attachments/assets/7ff8ba68-66fb-4a1f-8e5c-5a557a52cd89" />
<img width="1919" height="902" alt="image" src="https://github.com/user-attachments/assets/ffc3073e-5f36-4839-a4e8-bab23154e4f7" />
<img width="1918" height="824" alt="image" src="https://github.com/user-attachments/assets/e7951a6f-fb78-4418-bff9-eba344edd723" />
<img width="1918" height="816" alt="image" src="https://github.com/user-attachments/assets/c12b01a1-b9c3-45d3-b79f-7e3bbf69967e" />
<img width="1919" height="827" alt="image" src="https://github.com/user-attachments/assets/468edd97-ea06-46a1-bc66-71bd21f4ba6e" />
<img width="1916" height="826" alt="image" src="https://github.com/user-attachments/assets/942bf156-0534-4640-949d-56d5d3d69daa" />
<img width="1910" height="829" alt="image" src="https://github.com/user-attachments/assets/28bb2224-1e25-4eca-a050-b7436793bc88" />
<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/aee6029f-40dd-43cf-9102-34fae7060338" />
<img width="1919" height="823" alt="image" src="https://github.com/user-attachments/assets/9a12b8b6-9699-464b-9080-a666b0e66de6" />
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/02f2d6db-7cbe-48f0-8b23-80e8ccdbff2b" />
<img width="1086" height="803" alt="image" src="https://github.com/user-attachments/assets/ea4bf93c-4020-4ccd-956a-af26fb2fd8e2" />
<img width="1919" height="813" alt="image" src="https://github.com/user-attachments/assets/a396f424-4b0f-4eeb-95a8-63fa7cc95638" />
<img width="1919" height="819" alt="image" src="https://github.com/user-attachments/assets/4f8174be-8e35-4156-ac81-0fdee7238c27" />
<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/8f7521e8-71d8-4dd2-9363-1856e966dfe8" />
<img width="1905" height="818" alt="image" src="https://github.com/user-attachments/assets/9f04ffe8-a995-4f63-a2b4-29a4ab56eddf" />

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [Aman Gupta](https://github.com/google-deepmind)
