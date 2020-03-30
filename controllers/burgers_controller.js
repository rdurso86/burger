let express = require("express");

let router = express.Router();

let burgers = require("../models/burger.js");

router.get("/", function (req, res) {
  burgers.all(function (data) {
    let hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burgers.create(["burger_name"], [req.body.burger_name], function (result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  burgers.delete(condition, function (result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  }
  );
});

module.exports = router;
