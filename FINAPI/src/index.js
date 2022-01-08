const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// cpf - String
// name- String
// id - uuid
// stateman []
app.post("/acount", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidv4();
  customers.push({
    id,
    cpf,
    name,
    stateman: [],
  })

  return res.status(201).json({
    message: "Account created",
  });
});

app.listen(3333, () => {
  console.log("⚙️  Server is running in http://localhost:3333");
});
