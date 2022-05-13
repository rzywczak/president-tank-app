const express = require("express");
const Tank = require("../models/tank");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/api/tanks", auth, async(req, res) => {
  const tank = new Tank({
    ...req.body,
    owner: req.body.user,
  });
  try {
       await tank.save()
       await res.status(201).send(tank);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get all tanks
router.get("/api/tanks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "tanks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tanks);
  } catch (e) {
    res.status(500).send();
  }
});
//get one  tank
router.get("/api/tanks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const tank = await Tank.findOne({ _id, owner: req.user._id });
    if (!tank) {
      res.status(404).send();
    }
    res.send(tank);
  } catch (e) {
    res.status(500).send();
  }
});
// update  tank
router.patch("/api/tanks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "sideNumber",
    "producent",
    "model",
    "currentModification",
    "productonYear",
    "introductionToCountry",
    "course",
    "ammunition",
    "armorSide",
    "armorFront",
    "armorBack",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Invalid data");
  }


  try {
    const tank = await Tank.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
   
    if (!tank) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      tank[update] = req.body[update];
    });
    await tank.save();
    res.send(tank);
  } catch (e) {
    res.status(500).send();
  }
});
// delete  tank
router.delete("/api/tanks/:id", auth, async (req, res) => {
  try {
    const tank = await Tank.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tank) {
      res.status(404).send();
    }
    res.status(204).send(tank);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
