require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Contacts = require('./models/contacts');
// const { MongoClient } = require("mongodb");

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.use(express.json());

app.use(cors());

app.use(express.static('build'));

morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

const generateId = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get('/', (request, response) => {
	response.send('<h2>Phonebook NodeJS Backend</h2>');
});

app.get('/api/info', (request, response) => {
	Contacts.find({}).then((results) => {
		const count = results.length;
		response.send(
			`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
		);
	});
});

app.get('/api/persons', (request, response) => {
	Contacts.find({}).then((contact) => {
		console.log(contact);
		response.json(contact);
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Contacts.findById(request.params.id)
		.then((contact) => {
			if (contact) {
				response.json(contact);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
	// const id = Number(request.params.id);
	// const person = Contacts.find((person) => person.id === id);
	// person ? response.json(person) : response.status(404).end();
});

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Contacts.findByIdAndUpdate(request.params.id, person, {
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then((updatedContact) => {
			response.json(updatedContact);
		})
		.catch((error) => next(error));
});

app.post('/api/persons', (request, response,next) => {
	const body = request.body;

	// if (!body.name) {
	//   return response.status(400).json({
	//     error: "name missing",
	//   });
	// }
	// if (!body.number) {
	//   return response.status(400).json({

	//     error: "number missing",
	//   });
	// }
	//   if (Contacts.some((person) => person.name === body.name)) {
	//     return response.status(400).json({
	//       error: "name must be unique",
	//     });
	//   }

	const person = new Contacts({
		name: body.name,
		number: body.number,
		id: generateId(1, 1000),
	});

	// persons = persons.concat(person)
	// console.log(person.id)

	// response.json(person)
	person.save().then((savedContact) => {
		response.json(savedContact);
	})
		.catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
	Contacts.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
	// const id = Number(request.params.id);
	// persons = persons.filter((person) => person.id !== id);
	// response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
