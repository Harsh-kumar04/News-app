# 📰 News App

A backend **Node.js + Express** application for managing a news platform.  
Users can read news, comment, like posts, and reporters can manage content.  
The project is modular, scalable, and designed for maintainability.

---

## 🚀 Features

- 🔐 **User Authentication:** Secure signup, login, and JWT-based authorization  
- 📰 **News Management:** Create, read, update, and delete news articles  
- 🗂️ **Category Management:** Organize news by categories  
- 🌆 **City Management:** Filter news by city  
- 💬 **Comments:** Users can comment on news articles  
- ❤️ **Likes:** Users can like news articles  
- 👤 **Profile Management:** Update user profiles  
- 📝 **Reporter Module:** Manage reporter accounts and their news contributions  
- ⚙️ **Modular Structure:** Each feature implemented as a separate module  
- 💬 **Error Handling:** Centralized and consistent error responses  
- 🌍 **Environment Config:** Configurable using `.env` file  

---

## 🧩 Project Structure

modules/v1/
│
├── auth/ # User authentication (register, login, JWT)
├── category/ # News category management
├── city/ # City-based filtering
├── comment/ # Comment management
├── like/ # Like functionality
├── news/ # CRUD operations for news articles
├── profile/ # User profile management
├── Reporter/ # Reporter management


---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | Mysql |
| **Authentication** | JWT, bcrypt |
| **Environment Config** | dotenv |
| **Validation (optional)** |  Validator |

---

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/e3004892-d043-4f3d-980e-cb2daf07ae47" />

## ⚙️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/Harsh-kumar04/News-App.git

# Navigate into the project folder
cd News-App

# Install dependencies
npm install

# Create a .env file in the root directory and add your configuration
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Start the server
npm start

The API will now run on http://localhost:5000

📡 API Modules Overview
Module	Description
/auth	User registration, login, and JWT authentication
/category	Manage news categories
/city	Manage city data and filter news
/comment	Add, edit, and delete comments
/like	Like/unlike news articles
/news	CRUD operations for news articles
/profile	Manage user profiles
/Reporter	Manage reporters and their contributions
🔮 Future Enhancements

News search and filtering

Real-time notifications for new articles

Admin dashboard for managing users and content

Integration with image/video storage for news articles

Analytics for popular news and engagement


