# 🍱 Snackaroo – Asian Snack Delivery Web App (Full Stack)

**Snackaroo** is a full-stack e-commerce platform built for Asian snack lovers at **Stony Brook University**, offering a seamless shopping and checkout experience for campus delivery.

This monorepo includes:
- 🖼️ `frontend/` – user-facing React.js site
- 🖥️ `backend/` – Express + MongoDB server for authentication, product handling, and Stripe payments
- ⚙️ `admin/` – internal admin panel for managing product inventory

---

## 🖼️ Preview

![SNACKAROO Screenshot](Snackaroo-Screenshot.png)  
_Example: Product page for Ramune, filtering, and responsive cart view_

---

## 🌍 LIVE DEMO
- 🌐 [Frontend](https://chrisw0987.github.io/snackaroo/)
- 🧪 *Backend & Admin not deployed online yet – run locally*

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Context API
- Stripe.js
- CSS Modules / global CSS

### Backend
- Node.js + Express
- MongoDB (via Mongoose)
- JWT Authentication
- Stripe Webhooks
- Multer for image uploads

### Admin
- React + Admin UI
- Inventory control
- Product creation & deletion

---

## 📦 Features

### 👩‍🍳 Frontend
- 🛍 Browse snacks by category: Crunchy, Sweets, Drinks
- 🧾 Add-to-cart with quantity selector
- 💵 Dynamic pricing (old/new price)
- 🧑‍💼 User signup/login + secure JWT session
- 📦 Shipping form with Stripe checkout

### 🛠 Backend
- 🗂 RESTful API for products, users, and orders
- 🧾 Secure checkout via Stripe PaymentIntent
- 🧹 Webhook clears cart on payment success
- 🛡 Protected routes via JWT middleware

### 🧑‍💼 Admin
- ➕ Add new snacks with images, category, and pricing
- ❌ Delete products
- 📊 Dashboard overview (optional)

---

## 🚀 Getting Started (Local Setup)

```bash
git clone https://github.com/chrisw0987/snackaroo.git
cd snackaroo