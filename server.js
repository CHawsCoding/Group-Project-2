// Import required modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const sequelize = require("./config/connection.js");
const routes = require("./controllers/index-routes");
const uuid = require("uuid");
const sessionSecret = uuid.v4();
const userRoutes = require("./controllers/user-routes");
const helpers = require("./utils/helpers");
const reviewRoutes = require("./controllers/review-routes.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;

if (!process.env.SESSION_SECRET) {
  const sessionSecret = uuid.v4();
  process.env.SESSION_SECRET = sessionSecret;
}

require("./config/passport")(passport);

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoutes);
app.use(routes);
app.use("/review", reviewRoutes);

app.engine(
  "handlebars",
  require("express-handlebars")({ defaultLayout: "main", helpers: helpers })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("homepage", { layout: "main" });
});
// Handle invalid routes
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

async function startServer() {
  try {
    await sequelize.sync({ force: false });

    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to synchronize models to the database:", err);
  }
}

startServer();
