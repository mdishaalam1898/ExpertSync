const router = require("express").Router();

const {getExperts, getExpertsById, createExpert} = require("../controllers/expertController");
router.post("/", createExpert);

router.get("/", getExperts);

router.get("/:id", getExpertsById);

module.exports = router;