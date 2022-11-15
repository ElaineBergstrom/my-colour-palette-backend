const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const colours = [
  {
    name: "Lerhyttan (IKEA)",
    notation: "NCS S 2502-R",
    hex: "#bdb9b8",
  },
  {
    name: "Bodarp (IKEA)",
    notation: "NCS S 5005-G20Y",
    hex: "#80887f",
  },
  {
    name: "Bodbyn (IKEA)",
    notation: "NCS S 8010-G10Y",
    hex: "#3c4840",
  },
  {
    name: "Axstad (IKEA)",
    notation: "NCS S 6500-N",
    hex: "#6f6e6e",
  },
  {
    name: "Sunny",
    notation: "RAL1016",
    hex: "#edff21",
  },
  {
    name: "Blood",
    notation: "RAL3018",
    hex: "#d53032",
  },
];

app.get("/api/colours", (req, res) => {
  res.json(colours);
});

app.post("/api/colours", (req, res) => {
  const colour = { id: Date.now(), resolved: false, ...req.body };
  colours.push(colour);

  res.json(colour);
});

app.patch("/api/colours/:id", (req, res) => {
  const index = colours.findIndex(
    (colour) => colour.id === parseInt(req.params.id)
  );
  const colour = colours[index];
  if ("resolved" in req.body) colour.resolved = req.body.resolved;

  res.json(colour);
});

app.listen(9001, () => {
  console.log("Node server started on port 9001.");
});
