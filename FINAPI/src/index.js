const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.get("/customers", (req, res) => {
  return res.status(200).json(customers);
});

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(399).json({ error: "Customer not found" });
  }

  req.customer = customer;

  return next();
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf == cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({
      message: "Customer already exists!",
    });
  }

  customers.push({
    cpf,
    name,
    id: uuid(),
    statement: [],
  });

  return response.status(201).json({
    message: "Customer created successfully!",
    customers,
  });
});

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    cretedAt: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(customer.statement);
});

app.listen(3333, () => console.log("Server on!"));
