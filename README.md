# 🍔 Foodly – Discover Food Through Reels

**Foodly** is a full-stack food discovery platform where food partners can showcase their food through short video reels, while users can explore different food items, interact with videos, and save their favourites.

The idea behind Foodly is to make food discovery more engaging and visual, helping food businesses showcase what they offer while allowing users to discover interesting food.

🌐 **Live Demo:** https://foodly-brown.vercel.app/

---

## ✨ Features

### 🏪 For Food Partners

- **Upload Food Reels:** Upload short food videos to showcase your food items.
- **Manage Uploads:** View all your previously uploaded food reels in one place.
- **Showcase Your Food:** Add food names, descriptions, and videos to attract potential customers.
- **Dedicated Authentication:** Secure registration and login for food partners.

### 👤 For Users

- **Explore Food Reels:** Browse food videos uploaded by different food partners.
- **Like Videos:** Like food reels you enjoy.
- **Save Videos:** Bookmark your favourite food reels.
- **Saved Videos:** Access your saved food videos whenever you want.
- **Discover Food Partners:** Explore food content from different food businesses.

### 🚧 Upcoming Features

- **Comment System:** Allow users to comment on food reels and interact with other users.
- More improvements and features coming soon!

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Express Validator

### Storage & Deployment
- ImageKit – Video and media storage.
- MongoDB Atlas – Cloud database.
- Render – Backend deployment.
- Vercel – Frontend deployment.

---

## 📂 Project Structure

```text
Foodly/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── services/
│   ├── app.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run Foodly locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd Foodly
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend development server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

The application should now be accessible at:

```text
http://localhost:5173
```

---

## 🔐 Authentication & Security

Foodly implements authentication using JSON Web Tokens (JWT).

- Separate authentication for users and food partners.
- Protected routes using authentication middleware.
- Password hashing for secure password storage.
- Cookie-based authentication.
- Input validation using Express Validator.

---

## 🚀 Deployment

Foodly is deployed using the following services:

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Media Storage | ImageKit |

---

## 🔮 Future Improvements

Some features planned for future development:

- [ ] Comment system for food reels.
- [ ] User profiles and profile customization.
- [ ] Improved food discovery and search.
- [ ] Follow food partners.
- [ ] Improved recommendation system.
- [ ] Notifications and user interactions.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!

If you find a bug or have an idea for improving Foodly, feel free to open an issue or submit a pull request.

---

**Foodly – Discover. Explore. Enjoy.**
