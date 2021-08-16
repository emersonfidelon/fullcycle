const db = require('./db')
const express = require('express')
const faker = require('faker')
const app = express()
const port = process.env.APP_PORT || 3000

const generateFakePeople = (qtd = 10) => {
  const people = []
  for (let i = 0; i < qtd; i++) {
    people.push(faker.name.findName())
  }
  return people
}

const populateDatabase = (qtd = 10) => {
  const fakePeople = generateFakePeople(qtd)
  
  fakePeople.forEach((person)=>{
    db.create(person);
  })
}

const getAllPeople = async () => {
  const allPeople = await db.findAll();
  return allPeople;
}

app.get('/', async (req, res) => {

  let people = await getAllPeople()
  if(!people.length) {
    await populateDatabase(10)
    people = await getAllPeople()
  }
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ol>
      ${people.map(person => `<li>${person.name}</li>`).join('')}
    </ol>
  `)
})

app.listen(port, () => {
  console.log('NODEJS Rodando na porta:', port);
})