const express = require("express");
const HotelName = require("../controllers/room");
const router = new express.Router();

router.post("/rooms", async (req, res) => {
  const rooms = new HotelName(req.body);
  try {
    await rooms.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/rooms", async (req, res) => {
  const search = req.query.search;
  const roomType = req.query.roomType;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  try {
    let queryString = {};
    if (search) {
      queryString.codeName = { $regex: search };
    }
    if (roomType) {
      queryString.roomType = roomType;
    }
    if (minPrice) {
      queryString.prize = { $gte: minPrice };
    }
    if (maxPrice) {
      queryString.prize = { $lte: maxPrice };
    }
    const rooms = await HotelName.find({ queryString });
    res.send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/rooms/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const room = await HotelName.findById(_id);
    if (!room) {
      res.status(404).send();
    } else {
      res.send(room);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/rooms/:id", async (req, res) => {
  const _id = req.params.id;
  //   Validating the neccessary updates.
  const updates = Object.keys(req.body);
  const allowedUpdates = ["codeName", "type", "prize"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    const room = await HotelName.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!room) {
      res.status(404).send();
    } else {
      res.send(room);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/rooms/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const room = await HotelName.findByIdAndDelete(_id);
    if (!room) {
      res.status(404).send();
    } else {
      res.send(room);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
