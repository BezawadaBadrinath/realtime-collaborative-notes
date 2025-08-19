📝 Realtime Collaborative Notes App
A full-stack realtime collaborative notes application with authentication, real-time updates, and live user indicators.

🚀 Features
🔐 JWT Authentication - User registration and login

📝 Notes CRUD Operations - Create, read, update, and delete notes

🌐 Real-time Collaboration - Live updates using WebSockets

⌨️ Typing Indicators - See when others are editing

👥 Online Users List - View all connected users

📱 Responsive Design - Works on desktop and mobile devices

🛠️ Tech Stack
Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM for MongoDB

JWT - Authentication

Socket.io - Real-time communication

bcryptjs - Password hashing

CORS - Cross-origin requests

Frontend
React - UI framework

Socket.io-client - Real-time client

Axios - HTTP client

React Router - Navigation

CSS3 - Styling

📦 Installation & Setup
Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn

Backend Setup
Clone the repository:

bash
git clone <your-repo-url>
cd collaborative-notes-app/backend
Install dependencies:

bash
npm install
Create a .env file in the backend directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
Start the backend server:

bash
npm run dev
Frontend Setup
Navigate to the frontend directory:

bash
cd ../frontend
Install dependencies:

bash
npm install
Create a .env file in the frontend directory:

env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
Start the frontend development server:

bash
npm start
🗄️ Database Schema
User Model
javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date
}
Note Model
javascript
{
  title: String,
  content: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
🔌 API Endpoints
Authentication Routes
POST /api/auth/register - Register a new user

POST /api/auth/login - Login user

GET /api/auth/me - Get current user (protected)

Notes Routes
GET /api/notes - Get all notes for authenticated user (protected)

POST /api/notes - Create a new note (protected)

GET /api/notes/:id - Get a specific note (protected)

PUT /api/notes/:id - Update a note (protected)

DELETE /api/notes/:id - Delete a note (protected)

POST /api/notes/:id/collaborators - Add collaborator to note (protected)

WebSocket Events
join-note - Join a note room

leave-note - Leave a note room

note-update - Receive note updates

typing-start - User started typing

typing-stop - User stopped typing

user-joined - User joined the note

user-left - User left the note

🎮 Usage
Register/Login: Create an account or login with existing credentials

Create Notes: Click "New Note" to create a new note

Edit Notes: Click on any note to start editing

Real-time Collaboration: Share the note URL with others to collaborate in real-time

See Live Updates: Watch changes happen in real-time without refreshing

View Online Users: See who else is currently viewing the same note

🚀 Deployment
Backend Deployment (Render/Railway)
Connect your GitHub repository

Set environment variables in the dashboard

Deploy

Frontend Deployment (Vercel/Netlify)
Connect your GitHub repository

Set environment variables:

REACT_APP_API_URL = your deployed backend URL

REACT_APP_WS_URL = your deployed WebSocket URL (wss://)

Deploy

MongoDB Setup
Use MongoDB Atlas for cloud database or install MongoDB locally

📝 Future Enhancements
Note version history

Comments on notes

Note templates

Rich text formatting

File attachments

Note export functionality

Mobile app version

Email notifications

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Developer
Developed with ❤️ by Bezawada Badrinath
