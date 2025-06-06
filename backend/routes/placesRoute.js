const express = require("express");
const router = express.Router();
const places = require("../data/placesData.js");

router.get("/", (req, res) => {
  res.json(places);
});

// In your placesRoute.js
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const place = places.find((p) => p.id === id);
  if (!place) {
    return res.status(404).json({ message: "Place not found" });
  }
  res.json(place);
});

// Add this POST endpoint for reviews
router.post("/:id/reviews", (req, res) => {
  const id = Number(req.params.id);
  const place = places.find((p) => p.id === id);
  if (!place) {
    return res.status(404).json({ message: "Place not found" });
  }

  const { name, rating, comment } = req.body;
  if (!place.reviews) place.reviews = [];
  place.reviews.push({ name, rating, comment });

  res.status(201).json(place.reviews);
});

module.exports = router;
