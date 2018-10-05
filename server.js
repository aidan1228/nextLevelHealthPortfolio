const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);


// const checkJwt = jwt({
//   // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN || 'aidan1228.auth0.com'}/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: process.env.AUTH0_AUDIENCE || "http://nextlevelhealth.com",
//   issuer: `https://${process.env.AUTH0_DOMAIN || 'aidan1228.auth0.com'}/`,
//   algorithms: ['RS256']
// });

// const checkScopes = jwtAuthz([ 'read:messages' ]);

// app.get('/api/public', function(req, res) {
//   res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
// });

// app.get('/api/private', checkJwt, checkScopes, function(req, res) {
//   res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
// });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nextLevelHealth");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
