require('dotenv').config();
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: "Welcome to the User API",
    endpoints: {
      users: "/users",
      docs: "/api-docs"
    }
  });
});

// User routes (MUST come before 404 handler)
app.use('/users', usersRouter);

// 404 handler (MUST come LAST after all other routes)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});