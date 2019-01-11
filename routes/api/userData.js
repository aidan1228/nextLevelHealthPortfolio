const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const jsonWebToken = require('jsonwebtoken');

const router = require("express").Router();
const nlhController = require("../../controllers/nlhController");

const jwksURI = `https://${process.env.AUTH0_DOMAIN || 'aidan1228.auth0.com'}/.well-known/jwks.json`;
const audience = process.env.AUTH0_AUDIENCE || "http://nextlevelhealth.com";
const issuer = `https://${process.env.AUTH0_DOMAIN || 'aidan1228.auth0.com'}/`;

console.log("jwksURI = ", jwksURI);
console.log("audience = ", audience);
console.log("issuer = ", issuer);

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksURI
  }),

  // Validate the audience and the issuer.
  audience: audience,
  issuer: issuer,
  algorithms: ['RS256']
});

const extractUserId = (req, res, next) => {
  // Grab Subject from JWT Token
  const tokenHeader = req.get('Authorization');
  
  if(tokenHeader && tokenHeader !== null && tokenHeader.startsWith('Bearer ')) {
    const token = tokenHeader.substr('Bearer '.length);
    const decoded = jsonWebToken.decode(token);
    const userId = decoded.sub;
    req.params.userId = userId;
    // console.log("req.params: ", req.params);
  }

  next();
};

const checkReadDataScope = jwtAuthz([ 'read:data' ]);
const checkCreateDataScope = jwtAuthz([ 'create:data' ]);

// Matches with "/api/userData"
router.route("/")
  .get(checkJwt, checkReadDataScope, extractUserId, nlhController.findAll)
  .post(checkJwt, checkCreateDataScope, extractUserId, nlhController.create);

router.route("/:username")
    .get(checkJwt, checkReadDataScope, extractUserId, nlhController.findByUsername)
    .put(checkJwt, checkCreateDataScope, extractUserId, nlhController.update)
    .delete(checkJwt, extractUserId, nlhController.remove);

router.route("/date/:username")
    .get(checkJwt, checkReadDataScope, extractUserId, nlhController.findByDate)

module.exports = router;