const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :response-time ms :body"));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const page = `<p> Phonebook has info for ${
    persons.length
  } people<br/> ${Date()} </p>`;
  response.send(page);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  // ID is not defined
  if (!id) {
    response.status(404).json({
      error: "content missing",
    });
  } else {
    const person = persons.find((p) => p.id === id);

    if (!person) {
      response.status(404).end()
    return;
    }

    response.json(person);
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!id) {
    response.status(404);
  }

  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body || !body.name || !body.phone) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (persons.find((n) => n.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    phone: body.number,
  };
  persons = persons.concat(person);

  response.json(persons);
});
