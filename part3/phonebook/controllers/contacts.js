const contactsRouter = require('express').Router();
const Contacts = require('../models/contact');

contactsRouter.get('/', (request, response) => {
	Contacts.find({}).then((contact) => {
		console.log(contact);
		response.json(contact);
	});
});

contactsRouter.get('/:id', (request, response, next) => {
	Contacts.findById(request.params.id)
		.then((contact) => {
			if (contact) {
				response.json(contact);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

contactsRouter.put('/:id', (request, response, next) => {
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

contactsRouter.post('/', (request, response, next) => {
	const body = request.body;

	const person = new Contacts({
		name: body.name,
		number: body.number
	});

	person
		.save()
		.then((savedContact) => {
			response.json(savedContact);
		})
		.catch((error) => next(error));
});

contactsRouter.delete('/:id', (request, response, next) => {
	Contacts.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

module.exports = contactsRouter;