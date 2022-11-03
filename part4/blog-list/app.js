require('express-async-errors')

const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')
const {
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
} = require('./utils/middleware')


app.use(cors())
app.use(express.json())

logger.info('connecting to...', config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})


app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
