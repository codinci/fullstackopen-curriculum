const mongoose = require('mongoose');
// const { MongoClient } = require("mongodb");

// eslint-disable-next-line no-undef
const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://fullstackopen:${password}@cluster0.gcp8fgf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	);
	// eslint-disable-next-line no-undef
	process.exit(1);
}

const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', phonebookSchema);

// eslint-disable-next-line no-undef
if (process.argv.length > 3) {
	const contactName = process.argv[3];
	const contactNumber = process.argv[4];

	mongoose
		.connect(url)
		.then(() => {
			console.log('connected!!');
			const person = new Person({
				name: contactName,
				number: contactNumber,
			});

			return person.save();
		})
		.then(() => {
			console.log(`added ${contactName} number ${contactNumber} to phonebook!`);
			return mongoose.connection.close();
		})
		.catch((err) => console.log(err));
} else {
	mongoose.connect(url).then(() => {
		console.log('connected!!');
		Person.find({}).then((result) => {
			console.log('phonebook:');
			result.forEach((contact) => {
				console.log(contact.name + ' ' + contact.number);
			});
			mongoose.connection.close();
		});
	});
}
