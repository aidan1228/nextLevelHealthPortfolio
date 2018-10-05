const router = require("express").Router();
const nlhController = require("../../controllers/nlhController");

// Matches with "/api/books"
router.route("/")
  .get(nlhController.findAll)
  .post(nlhController.create);

// Matches with "/api/nlh/:id"
router
  .route("/:id")
  .get(nlhController.findById)
  .put(nlhController.update)
  .delete(nlhController.remove);

module.exports = router;
