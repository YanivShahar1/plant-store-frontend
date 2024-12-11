# 🌿 Plant Store Frontend

A React-based frontend for a plant store e-commerce platform, built with Vite, Redux Toolkit, and TailwindCSS.

> **Note**: This is a demonstration/portfolio project. The checkout process is simulated and no real transactions are processed. All plants and prices are for demonstration purposes only.

## 🎥 Project Preview
<p align="center">
  <a href="https://youtu.be/__J_0LBf-cc">
    <img src="https://img.youtube.com/vi/__J_0LBf-cc/maxresdefault.jpg" alt="Plant Store Frontend Demo" width="600"/>
  </a>
</p>
<p align="center">Click the image above to watch the demo video</p>

## 🔗 Quick Links
- 🌐 [Live Demo](https://plant-store-frontend.vercel.app/)
- 📹 [Video Walkthrough](https://youtu.be/__J_0LBf-cc)
- 🔧 [Backend Repository](https://github.com/YanivShahar1/plant-store-backend)

## ✨ Features

- 🎯 **Modern React Implementation**
  - Built with Vite for faster development
  - Redux Toolkit for state management
  - React Router v6 for navigation
  - Custom hooks for reusable logic

- 🎨 **User Interface**
  - Responsive design using TailwindCSS
  - Interactive product carousels with Swiper.js
  - Dynamic search and filtering
  - Skeleton loading states
  - Error boundaries

- 🛒 **Shopping Features**
  - Real-time cart management
  - Wishlist functionality
  - Category filtering
  - Search functionality
  - Product details with care instructions

- 👤 **User Features**
  - Firebase Authentication
  - Google Sign-in integration
  - Protected routes
  - User profile management
  - Order history tracking

- 📊 **Admin Dashboard**
  - Plant inventory management
  - Interactive charts using Chart.js
  - Sales analytics display
  - User management interface

## 🚀 Technical Stack

- **Framework**: React.js 18 with Vite
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Authentication**: Firebase
- **UI Components**:
  - Swiper.js
  - Chart.js
  - React Icons
- **HTTP Client**: Axios
- **Forms**: React Hook Form

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YanivShahar1/plant-store-frontend.git
   cd plant-store-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file:
   ```env
   VITE_API_KEY=            # Firebase API Key
   VITE_PROJECT_ID=         # Firebase Project ID
   VITE_STORAGE_BUCKET=     # Firebase Storage Bucket
   VITE_MESSAGING_SENDERID= # Firebase Messaging Sender ID
   VITE_APPID=             # Firebase App ID
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🌿 Demo Accounts

### Customer Demo
- Email: `demo@example.com`
- Password: `demo123`

### Admin Demo
- Email: `admin@example.com`
- Password: `admin123`
- Access: Navigate to `/admin`

## 💡 Key Implementation Details

### Component Structure
- Atomic design pattern
- Reusable components
- Layout components
- Protected route wrappers

### State Management
- Redux Toolkit for global state
- RTK Query for API calls
- Local state with useState
- Context for auth state

### Styling Approach
- TailwindCSS for utility-first styling
- Custom components
- Responsive design principles
- Dynamic themes

### Performance Optimizations
- Lazy loading components
- Memoization where needed
- Image optimization
- Error boundaries

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


Made with ❤️ by [Yaniv Shahar](https://github.com/yanivshahar1)