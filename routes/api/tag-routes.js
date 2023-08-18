const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  let tags = await Tag.findAll({
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
  });
  return tags;
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let tag = await Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, as: "product" }],
  });
});

router.post("/", async (req, res) => {
  // create a new tag
  let newTag = Tag.create(req.body);

  return newTag;
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  let updatedTag = await Tag.update(
    { name: req.body.name },
    { where: { id: req.params.id } }
  );
  await updatedTag.save();
  return updatedTag;
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({ where: { id: req.params.id } });
  return { message: "DELETED" };
});

module.exports = router;
