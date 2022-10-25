const contactsRouter = require('express').Router();
const Contacts = require('../models/contact');

contactsRouter.get('/', async (request, response) => {
	const contacts = await Contacts.find({});
	response.json(contacts.map((contact) => contact.toJSON()));
});

contactsRouter.get('/:id', async (request, response) => {
	const contact = await Contacts.findById(request.params.id);
	if (contact) {
		response.json(contact);
	} else {
		response.status(404).end;
	}
});

contactsRouter.put('/:id', async (request, response) => {
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	const updatedContact = await Contacts.findByIdAndUpdate(
		request.params.id,
		person,
		{
			new: true,
			runValidators: true,
			context: 'query',
		}
	);
	if (updatedContact) {
		response.json(updatedContact);
	} else {
		response.status(404).end();
	}
});

contactsRouter.post('/', async (request, response) => {
	const body = request.body;

	const person = new Contacts({
		name: body.name,
		number: body.number,
	});
	const savedContact = await person.save();
	response.status(201).json(savedContact);
});

contactsRouter.delete('/:id', async (request, response) => {
	await Contacts.findByIdAndRemove(request.params.id);
	response.status(204).end;
});

module.exports = contactsRouter;
