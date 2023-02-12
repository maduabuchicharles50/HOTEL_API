const express = require("express");
const RoomTypes = require("../controllers/roomtype");
const router = new express.Router();

router.post("/room-type", async (req, res) => {
  const roomTypes = new RoomTypes(req.body);
  try {
    await roomTypes.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/room-type", async (req, res) => {
  try {
    const roomTypes = await RoomTypes.find({});
    res.send(roomTypes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;