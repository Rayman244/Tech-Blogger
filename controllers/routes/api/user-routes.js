const router = require("express").Router();
const bcrypt = require('bcrypt');
const {User,Blog} = require('../../../models')
const saltRounds = 10;

// Read All
router.get("/", async (req, res) => {
    // find all users
    try {
      const userData = await User.findAll({
        include: [{ model: Blog }],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// READ
  router.get("/:id", async (req, res) => {
    // find user by its id
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: Blog }],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// CREATE
  router.post("/", async (req, res) => {
    // create a new user
    try {
      const newUser = req.body
      newUser.hashedPassword = await bcrypt.hash(req.body.hashedPassword, saltRounds);
      const userData = await User.create(newUser);
      if (!userData) {
        res.status(404).json({ message: "Please try again!" });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   UPDATE
  router.put("/:id", async (req, res) => {
    // update a category by its `id` value
    try {
      const userData = await User.update(
      {
        email: req.body.email,
        hashedPassword: req.body.hashedPassword
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
      if(!userData){
        res.status(404).json({ message: "Please try again!" });
        return;
      }
    return res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
    
  });
//   Delete
router.delete("/:id", async (req, res) => {
    // delete a user
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if(!userData){
        res.status(404).json({ message: "Please enter a valad Category!" });
        return;
      }
    return res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router