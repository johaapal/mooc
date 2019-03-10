const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();
app.use(cors())
morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan(':method :url :status :req[body] - :response-time ms'));



let persons = [{
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Lea Kutvonen',
    number: '040-123456',
    id: 4
  }
];


app.get('/api/persons', (req, res) => {
  console.log("getti");
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  let person = ''
  person = persons.find(person => person.id === id);
  console.log("valittu", persons);

  if (person) {
    console.log("id on");
    res.json(person);
  } else {
    console.log("id:tä ei ole");
    res.status(404).end()
  }

})

app.delete('/api/persons/:id', (req, res) => {
  console.log("tulee deleteen");
  let id = Number(req.params.id);
  let person = persons.find(person => person.id === id);
  console.log("person", person);
  if (person) {
    persons.splice(id, 1);
    console.log("ihmiset", persons);
    res.status(204).end();
  } else {
    console.log("id:tä ei ole");
    res.json({
      "error": "no such id"
    });
  }

})

app.post('/api/persons', function(req, res) {
 // console.log("tulee postiin", req.body);
  let nimi = req.body.name;
  let number = req.body.number;
  let id = Math.floor(Math.random() * 100 + 1)
  persons.push({
    "nimi": nimi,
    "number": number,
    "id": id
  });
  //console.log(persons);
  res.status(200).end();
})

app.get('/api/info', (req, res) => {
  console.log("info", persons.length);
  let d = new Date();
  let n = d.toISOString();
  let tieto = "puhelinluettelossa on " + persons.length + " ihmisen teidot" + "</br>" + n;

  res.send(tieto);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})