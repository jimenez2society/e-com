const router = require("express").Router();
const { Category, Product } = require("../../models");
// The /api/categories endpoint
router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [Product],
  }).then((catData) => {
    res.json(catData);
  });
});
router.get("/:id", (req, res) => {
  // find one category by its id value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Products
    include: [Product],
  }).then((getID) => {
    res.json(getID);
  });
});
router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then((createdCat) => {
    res.json(createdCat);
  });
});
router.put("/:id", (req, res) => {
  // update a category by its id value
  Category.update({
    where: {
      id: req.params.id,
    },
  });
});
router.delete("/:id", (req, res) => {
  // delete a category by its id value
  // Category.delete({
  // })
});
module.exports = router;
