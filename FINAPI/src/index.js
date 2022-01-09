const express = require('express')
const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.body;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: 'Customer not found' });
  }

  req.customer = customer;

  return next();
}

app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    const customerAlreadyExists = customers.some(
        customer => customer.cpf == cpf
    )

    if(customerAlreadyExists){
        return response.status(400).json({
            message: 'Customer already exists!'
        })
    }

    customers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    })

    return response.status(201).json({
        message: 'Customer created successfully!',
        customers,
    })
})

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  
  return res.json(customer.statement);
})

app.listen(3333, () => console.log('Server on!'))