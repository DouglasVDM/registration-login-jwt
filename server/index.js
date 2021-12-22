const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json()); // ACCESS TO req,body
app.use(cors());

// ROUTES

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});