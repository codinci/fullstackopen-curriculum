const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
	.connect(url)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: [true, 'Contact name required']
	},
	number: {
		type: String,
		required: [true, 'Phone number required'],
		minLength: 8,
		validate: {
			validator: function (v) {
				return /^(\d{2,3})(-)(\d+)$/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	}
});

phonebookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', phonebookSchema);
