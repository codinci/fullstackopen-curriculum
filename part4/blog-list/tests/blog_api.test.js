const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/test_helper');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
	await api
    .get("/api/blog")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blog');
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("verify id property name", async () => {
  const response = await api.get('/api/blog');
  response.body.forEach((blog) => {
    expect(blog._id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  };

  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const addedBlog = await helper.blogsInDb()
  const titles = addedBlog.map(r => r.title)
  expect(addedBlog).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain("Type wars");
})

test('blog without title is not added', async() => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  };
  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(400)

  const invalidBlog = await helper.blogsInDb()
  expect(invalidBlog).toHaveLength(helper.initialBlogs.length)
})

test("blog without url is not added", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    likes: 2,
  };
  await api.post("/api/blog").send(newBlog).expect(400);

  const invalidBlog = await helper.blogsInDb();
  expect(invalidBlog).toHaveLength(helper.initialBlogs.length);
});



afterAll(() => {
	mongoose.connection.close();
})
