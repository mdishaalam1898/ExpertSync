const Expert = require("../models/Expert");

exports.createExpert = async (req, res) => {

  try {

    const expert = await Expert.create(
      req.body
    );

    res.status(201).json(expert);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create expert",
    });

  }
};

exports.getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch experts" });
  }
};
exports.getExpertsById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }
  res.json(expert)
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
