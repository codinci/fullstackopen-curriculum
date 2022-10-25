const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blog")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blog");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("addition of a blog", () => {
  test("succeeds with valid data", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api
      .post("/api/blog")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const addedBlog = await helper.blogsInDb();
    const titles = addedBlog.map((r) => r.title);
    expect(addedBlog).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("Type wars");
  });

  test("fails with status code 400 when title is not provided", async () => {
    const newBlog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };
    await api.post("/api/blog").send(newBlog).expect(400);

    const invalidBlog = await helper.blogsInDb();
    expect(invalidBlog).toHaveLength(helper.initialBlogs.length);
  });

  test("fails with status code 400 when url is not provided", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 2,
    };
    await api.post("/api/blog").send(newBlog).expect(400);

    const invalidBlog = await helper.blogsInDb();
    expect(invalidBlog).toHaveLength(helper.initialBlogs.length);
  });
});

describe("verify data", () => {
  test("contains _id property", async () => {
    const response = await api.get("/api/blog");
    response.body.forEach((blog) => {
      expect(blog._id).toBeDefined();
    });
  });

  test("likes defaults to 0 on null entry", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };

    await api
      .post("/api/blog")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const addedBlog = await helper.blogsInDb();
    const lastItem = addedBlog[addedBlog.length - 1];
    expect(lastItem).toHaveProperty("likes");
    expect(lastItem.likes).toBe(0);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blog/${blogToDelete._id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("succeeds with updated data", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10,
    };

    await api
      .put(`/api/blog/${blogToUpdate._id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtUpdate = await helper.blogsInDb();
    const blogAfterUpdate = blogsAtUpdate[0];

    expect(blogAfterUpdate.likes).toBe(10);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
