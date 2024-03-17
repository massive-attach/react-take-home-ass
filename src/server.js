import cors from "cors";

import { getBallotData } from "./lib/ballot.js";

const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://localhost:8080",
  ],
  optionsSuccessStatus: 200,
};

// run express.js server
import express from "express";
const app = express();
app.use(cors(corsOptions));
const port = 6608;

app.get("/ballot", (req, res) => {
  res.send(getBallotData());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
