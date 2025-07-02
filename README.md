# Retail Dashboard App

An ecommerce idea called ByteShop, with a simulation of buying computers.
A modern, full-featured retail dashboard for managing and browsing products, simulating purchases, and visualizing sales and inventory data.  
This project is split into two repositories:

- **retail-dashboard-app**: Client-side (HTML, CSS, JavaScript, assets)
- **retail-dashboard-app-server**: Server-side (Node.js, Express, JSON data)

![image](https://github.com/user-attachments/assets/d96bab21-df09-4942-9d70-625bcb939624)

---

## About the Project
This project was developed as a real-world simulation of an online retail platform.  
It allows users to browse products, view details and reviews, manage a shopping cart, and complete purchases.  
Admins can access a dashboard with interactive charts (using Chart.js) to monitor inventory, sales, and review analytics.  
All data is persisted locally using JSON files (server) and Web Storage API (client).

---

### Client-side (Frontend)

- **Product Gallery:** Browse all available products.
- **Product Details:** View product descriptions, ratings, and user reviews.
- **Leave a Review:** Submit a 1-5 star rating and comment via a modern popup modal.
- **Shopping Cart:** Add/remove products, view individual and total prices.
- **Checkout:** Simulate purchases and update inventory.
- **Stock Simulation:** Product stock is updated after purchases.
- **Dashboard (Admin):** Visualize inventory, sales, and review data with Chart.js.
- **Local Persistence:** User cart is saved in the browser (Web Storage API).
- **Login System:** Only admins can access the dashboard.

### Server-side (Backend)

- **Product Management:** Loads and saves products from a JSON file.
- **Reviews:** Stores and returns product reviews (JSON).
- **Review Analytics:** Calculates average ratings, rating breakdown, and analyzes keywords in comments.
- **Purchases:** Updates stock and resets the user's cart after purchase.
- **Dashboard Data:** Provides data for dashboard charts.
- **Persistence:** All data is stored in JSON files (no database required).

---

## Getting Started

### 1. Clone both repositories

```bash
git clone https://github.com/your-username/retail-dashboard-app.git
git clone https://github.com/your-username/retail-dashboard-app-server.git
```

### 2. Install server dependencies

```bash
cd retail-dashboard-app-server
npm install
```

### 3. Start the server

```bash
node server.js
```

The backend will be available at `http://localhost:3000`.

### 4. Run the frontend

Open `index.html` from the `retail-dashboard-app` folder in your browser (or use a tool like Live Server in VS Code).

---

## 👤 Example Users

- **Admin:**  
  Username: `admin`  
  Password: `1234`  
  (Dashboard access)

- **User:**  
  Username: `user`  
  Password: `abcd`

---

## 🛠️ Technologies

- Node.js + Express (backend)
- HTML, CSS, JavaScript (frontend)
- Chart.js (dashboard)
- Web Storage API
- JSON for data persistence
