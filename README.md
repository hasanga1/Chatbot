
# ChatBot MERN Website

## Screenshots

![App Screenshot](https://drive.google.com/file/d/14mF94U0gvqEHYOWWo7xPrfUQBycm7j2h/view?usp=share_link)


## Introduction

EchoChat is a modern and responsive chatbot website built using the MERN stack (MongoDB, Express.js, React.js, Node.js) designed to provide intelligent, AI-powered conversations. Leveraging the OpenAI API, EchoChat delivers accurate and context-aware responses, enhancing user engagement.

EchoChat includes robust user authentication features, utilizing JWT (JSON Web Tokens) for secure token-based authentication and cookie-parser for managing session cookies. Users can easily sign up and sign in to access personalized features. The application also stores the conversation history, allowing users to revisit past interactions and continue their conversations seamlessly.

EchoChat is your reliable conversational assistant, offering a secure and user-friendly platform for all your chatbot needs.



## Features

- AI-Powered Conversations: Provides intelligent, context-aware responses using the OpenAI API.
- User Authentication: Secure sign-up and sign-in functionality with JWT-based authentication and session management via cookie-parser.
- Persistent Chat History: Automatically saves and displays conversation history for each user, allowing seamless continuation of past chats.
- Responsive Design: Optimized for various devices, offering a smooth and engaging user experience on desktops, tablets, and smartphones.
- Real-time Messaging: Instant response and interaction within the chat interface.
- Clear Chat History: Users can easily clear their chat history when needed, ensuring privacy and control over their data.
- Scalable Backend: Built with Express.js and MongoDB, ensuring scalability and efficient data management.
- Customizable: Easily extend or modify features to meet specific use cases or integrate with additional APIs.


## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Other Tools**: JWT for authentication, OpenAI API for AI-powered responses, Git & GitHub for version control
## Installation

- Prerequisites
  - Node.js (v14+)
  - npm or Yarn
  - MongoDB
  - OpenAI

- Clone the repository:
```bash
  git clone https://github.com/hasanga1/Chatbot.git
  cd Chatbot
```

- Install frontend dependencies
```bash
  cd frontend
  npm install
```

- Install frontend dependencies
```bash
  cd backend
  npm install
```

- Environment Variables

```
  OPEN_AI_SECRET = "your-openai-apikey"
  MONGODB_URL = "your-mongodb-cluster-url"
  JWT_SECRET = "your-jwt-secret-key"
  COOCKIE_SECRET = "your-jwt-secret-coockie"
  PORT = "available-port-to-listening"
```

- Run the application(Frontend)
```
  cd frontend
  npm run dev
```

- Run the application(Backend)
```
  cd backend
  npm run dev
```

## Authors

- [@hasanga](https://www.github.com/hasanga1)
- dinithhasangare@gmail.com

