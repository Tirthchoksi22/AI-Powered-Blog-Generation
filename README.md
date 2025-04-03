# BlogGenie

AI-Powered Blog Generation Tool

## Project Structure

```
bloggenie/
├── backend/           # Node.js/Express backend
├── Frontend/          # React/Vite frontend
│   └── blog-genie-magic-write-main/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Groq API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/bloggenie.git
cd bloggenie
```

2. Install dependencies for all parts
```bash
npm run install:all
```

3. Set up environment variables
   - Create a `.env` file in the `backend` directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     GROQ_API_KEY=your_groq_api_key
     JWT_SECRET=your_jwt_secret
     ```
   - Create a `.env` file in the `Frontend/blog-genie-magic-write-main` directory with:
     ```
     VITE_API_URL=http://localhost:3000
     ```

### Running the Application

To run both backend and frontend concurrently:
```bash
npm run dev
```

To run only the backend:
```bash
npm run backend
```

To run only the frontend:
```bash
npm run frontend
```

## Deployment Instructions

### Backend Deployment

1. **Deploy to a cloud platform**
   - [Render](https://render.com/)
   - [Railway](https://railway.app/)
   - [Heroku](https://www.heroku.com/)

2. **Set up environment variables**
   - `MONGODB_URI`: Your MongoDB connection string
   - `GROQ_API_KEY`: Your Groq API key
   - `JWT_SECRET`: A secret key for JWT token generation

### Frontend Deployment

1. **Update the API URL**
   - Edit the `.env.production` file and set `VITE_API_URL` to your deployed backend URL.

2. **Build the frontend**
   ```bash
   cd Frontend/blog-genie-magic-write-main
   npm run build
   ```

3. **Deploy to a static hosting service**
   - [Vercel](https://vercel.com/)
   - [Netlify](https://www.netlify.com/)
   - [GitHub Pages](https://pages.github.com/)

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Groq API
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI 