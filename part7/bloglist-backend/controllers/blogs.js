const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const notes = await Blog.find({})
		.find({})
		.populate('user', { username: 1, name: 1, id: 1 })

	response.json(notes)
})

blogsRouter.post('/', async (request, response) => {
	if (!request.user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = request.user
	const blog = new Blog({ ...request.body, user: user.id })

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog.id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const blogToDelete = await Blog.findById(request.params.id)
	if (!blogToDelete) {
		return response.status(204).end()
	}

	if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
		return response.status(401).json({
			error: 'only the creator can delete a blog',
		})
	}

	await Blog.findByIdAndRemove(request.params.id)

	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
		runValidators: true,
		context: 'query',
	})

	response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
	const blogComment = request.body

	const newComment = await Blog.findByIdAndUpdate(request.params.id,
		{ $push: { comments: blogComment.comment} },
		{ new: true })
	response.json(newComment).status(200).end()
})

module.exports = blogsRouter
