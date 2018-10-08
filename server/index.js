const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const config = require("./config");

require("./models").connect(process.env.MONGODB_URI || config.dbUri);

const app = express();
app.use(bodyParser.json());

const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require("./middleware/auth-check");
app.use("/api", authCheckMiddleware);

// routes
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const openApiRoutes = require("./routes/openapi");
app.use("/auth", authRoutes);
app.use("/openapi", openApiRoutes);
app.use("/api", apiRoutes);

// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
	console.log(`Listening on ${app.get("port")}`);
});
