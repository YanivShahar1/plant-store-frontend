# 🌿 Plant Store MERN Project

A full-stack e-commerce web application for a plant store built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

> **Note**: This is a demonstration/portfolio project. The checkout process is simulated and no real transactions are processed. All plants and prices are for demonstration purposes only.

## 🎥 Project Preview
<p align="center">
  <a href="https://youtu.be/__J_0LBf-cc">
    <img src="https://img.youtube.com/vi/__J_0LBf-cc/maxresdefault.jpg" alt="Plant Store MERN Project" width="600"/>
  </a>
</p>
<p align="center">Click the image above to watch the demo video</p>

## 🔗 Quick Links
- 🌐 [Live Demo](https://plant-store-frontend.vercel.app/)
- 📹 [Video Walkthrough](https://youtu.be/__J_0LBf-cc)
- 💻 [Frontend Repository](https://github.com/YanivShahar1/plant-store-frontend)
- 🔧 [Backend Repository](https://github.com/YanivShahar1/plant-store-backend)

## ✨ Features

- 🪴 **Plant Showcase**
  - Browse plants by category
  - Detailed plant information (care instructions, characteristics)
  - Search functionality
  - Trending plants section
  - Top sellers showcase

- 🛒 **Shopping Cart Demo**
  - Add/remove items from cart
  - Simulated checkout process
  - Demo order history
  - Wishlist functionality

- 👤 **User Features**
  - User authentication (Email/Password & Google Sign-in)
  - User profile dashboard
  - Demo order tracking
  - Personal preferences management

- 👨‍💼 **Admin Dashboard**
  - Plant inventory management
  - Sample order management
  - Demo analytics and statistics
  - User management interface

## 🚀 Technologies Used

### Frontend
- React.js with Vite
- Redux Toolkit (State Management)
- TailwindCSS (Styling)
- React Router (Navigation)
- Swiper.js (Carousels)
- Axios (API Requests)
- Firebase (Authentication)
- Chart.js (Analytics)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- Multer (File Uploads)

## 🛠️ Installation & Setup

1. **Clone the repositories**
   ```bash
   git clone https://github.com/YanivShahar1/plant-store-frontend.git
   git clone https://github.com/YanivShahar1/plant-store-backend.git
   ```

2. **Frontend Setup**
   ```bash
   cd plant-store-frontend
   npm install

   # Configure environment variables
   # Create .env file with:
   VITE_API_KEY=            # Firebase API Key
   VITE_PROJECT_ID=         # Firebase Project ID
   VITE_STORAGE_BUCKET=     # Firebase Storage Bucket
   VITE_MESSAGING_SENDERID= # Firebase Messaging Sender ID
   VITE_APPID=             # Firebase App ID
   ```

3. **Backend Setup**
   ```bash
   cd plant-store-backend
   npm install

   # Configure environment variables
   # Create .env file with:
   MONGODB_URI=            # Your MongoDB connection string
   JWT_SECRET_KEY=         # Your JWT secret key
   PORT=5000               # Port number
   ```

4. **Running the Application**
   
   Frontend:
   ```bash
   npm run dev
   ```

   Backend:
   ```bash
   npm start
   ```

## 🌿 Demo Accounts

### Customer Demo
- Email: `demo@example.com`
- Password: `demo123`

### Admin Demo
- Username: `admin@example.com`
- Password: `admin123`
- URL: `/admin`

## 💡 Project Purpose

This project was created to demonstrate:
- Full-stack development capabilities using the MERN stack
- Implementation of authentication and authorization
- Complex state management in React applications
- Responsive design principles
- RESTful API design
- Database modeling and relationships
- Admin dashboard functionality

## 📱 Key Implementations

- Responsive design for all screen sizes
- Protected routes and role-based access
- Form validation and error handling
- Real-time updates using Redux
- Comprehensive plant management system
- Interactive admin dashboard with charts
- Google OAuth integration
- JWT-based authentication

## 🔧 Environment Variables

Frontend (`.env`):
```env
VITE_API_KEY=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDERID=
VITE_APPID=
```

Backend (`.env`):
```env
MONGODB_URI=
JWT_SECRET_KEY=
PORT=5000
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

While this is a demo project, contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


Project Links:
- Frontend: [https://github.com/YanivShahar1/plant-store-frontend](https://github.com/YanivShahar1/plant-store-frontend)
- Backend: [https://github.com/YanivShahar1/plant-store-backend](https://github.com/YanivShahar1/plant-store-backend)

---

Made with ❤️ by [Yaniv Shahar](https://github.com/yanivshahar1)