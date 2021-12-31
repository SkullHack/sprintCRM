const router = require("express").Router();
const Employees = require("../models/employee");

router.route("/:id").get((req, res) => {
    Employees.findById(req.params.id)
      .then((employees) => res.json(employees))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  module.exports = router;