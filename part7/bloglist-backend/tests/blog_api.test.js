const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('../utils/test_helper')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

describe('tests for blogs', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
	})

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	describe('addition of a blog', () => {
		test('succeeds with valid data and token', async () => {
			const newBlog = {
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
			}

			const user = { username: 'root', password: 'sekret' }
			const userLogin = await api.post('/api/login').send(user)

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${userLogin.body.token}`)
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const addedBlog = await helper.blogsInDb()
			const titles = addedBlog.map((r) => r.title)
			expect(addedBlog).toHaveLength(helper.initialBlogs.length + 1)
			expect(titles).toContain('Type wars')
		})

		test('fails with status code 401 when token is not provided', async () => {
			const blogsAtStart = await helper.blogsInDb()

			const newBlog = {
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
			}
			await api.post('/api/blogs').send(newBlog).expect(401)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
		})

		test('fails with status code 400 when title is not provided', async () => {
			const newBlog = {
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
			}

			const user = { username: 'root', password: 'sekret' }
			const userLogin = await api.post('/api/login').send(user)

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${userLogin.body.token}`)
				.send(newBlog)
				.expect(400)

			const invalidBlog = await helper.blogsInDb()
			expect(invalidBlog).toHaveLength(helper.initialBlogs.length)
		})

		test('fails with status code 400 when url is not provided', async () => {
			const newBlog = {
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				likes: 2,
			}

			const user = { username: 'root', password: 'sekret' }
			const userLogin = await api.post('/api/login').send(user)

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${userLogin.body.token}`)
				.send(newBlog)
				.expect(400)

			const invalidBlog = await helper.blogsInDb()
			expect(invalidBlog).toHaveLength(helper.initialBlogs.length)
		})
	})

	describe('verify data', () => {
		test('contains id property', async () => {
			const response = await api.get('/api/blogs')
			response.body.forEach((blog) => {
				expect(blog.id).toBeDefined()
			})
		})

		test('likes defaults to 0 on null entry', async () => {
			const newBlog = {
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			}

			const user = { username: 'root', password: 'sekret' }
			const userLogin = await api.post('/api/login').send(user)

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${userLogin.body.token}`)
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const addedBlog = await helper.blogsInDb()
			const lastItem = addedBlog[addedBlog.length - 1]
			expect(lastItem).toHaveProperty('likes')
			expect(lastItem.likes).toBe(0)
		})
	})

	describe('deletion of a blog', () => {
		test('succeeds with status code 204 if id is valid', async () => {
			const newBlog = {
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
			}

			const user = { username: 'root', password: 'sekret' }
			const userLogin = await api.post('/api/login').send(user)

			const addedBlog = await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${userLogin.body.token}`)
				.send(newBlog)

			const blogToDelete = addedBlog.body

			const blogsBeforeDeletion = await helper.blogsInDb()

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set('Authorization', `bearer ${userLogin.body.token}`)
				.expect(204)

			const blogsAfterDeletion = await helper.blogsInDb()
			expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)

			const titles = blogsAfterDeletion.map((r) => r.title)
			expect(titles).not.toContain(blogToDelete.title)
		})
	})

	describe('update of a blog', () => {
		test('succeeds with updated data', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const blogToUpdate = blogsAtStart[0]

			const updatedBlog = {
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 10
			}

			await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(updatedBlog)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const blogsAtUpdate = await helper.blogsInDb()
			const blogAfterUpdate = blogsAtUpdate[0]

			expect(blogAfterUpdate.likes).toBe(updatedBlog.likes)
		})
	})
})

describe('tests for users', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('users are returned as json', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all users are returned', async () => {
		const users = await helper.usersInDb()
		const response = await api.get('/api/users')
		expect(response.body).toHaveLength(users.length)
	})

	describe('addition of a user', () => {
		test('creation succeeds with a fresh username', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: 'codinci',
				name: 'David Mburu',
				password: 'strongPassword',
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

			const usernames = usersAtEnd.map((u) => u.username)
			expect(usernames).toContain(newUser.username)
		})

		test('fails with status code 400 if username is already taken', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: 'root',
				name: 'Super user',
				password: 'TopSecret',
			}

			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			expect(result.body.error).toContain('username must be unique')

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toEqual(usersAtStart)
		})

		test('fails with status code 400 if username is less than 3 characters', async () => {
			const usersAtStart = await helper.usersInDb()

			const newInvalidUser = {
				username: 'ca',
				name: 'casual user',
				password: 'theUsual',
			}

			await api
				.post('/api/users')
				.send(newInvalidUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toEqual(usersAtStart)
		})

		test('fails with status code 400 if password is less than 3 characters', async () => {
			const usersAtStart = await helper.usersInDb()

			const newInvalidUser = {
				username: 'user',
				name: 'casual user',
				password: 'th',
			}

			await api
				.post('/api/users')
				.send(newInvalidUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toEqual(usersAtStart)
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
