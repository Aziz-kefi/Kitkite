require("dotenv").config();
const swaggerUI= require("swagger-ui-express") 
const swaggerJsDoc= require("swagger-jsdoc")
// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const morgan = require("morgan")

// VARIABLES
const app = express();
const port = process.env.PORT || 5000

// MIDDLEWARES
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/images-files', express.static('uploads/images'))

// DATABASE
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database connected")
    },
    (err) => {
      console.log("Error connecting to the database", err)
    }
  )
  
/////SWAGGER
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/user",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./routes/user-route.js"],
};

const specs = swaggerJsDoc(options);

// ROUTES
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/user", require("./routes/user-route"))

// SERVER START
const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server running on port ${port}`);
});