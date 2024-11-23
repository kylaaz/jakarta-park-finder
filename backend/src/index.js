import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
