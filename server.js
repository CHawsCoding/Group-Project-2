// Import required modules
const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const sequelize = require("./config/connection.js");
const routes = require('./controllers');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());



app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
  "handlebars",
  require("express-handlebars")({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'login'});
    });
// Handle invalid routes
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
  });

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

startServer();
