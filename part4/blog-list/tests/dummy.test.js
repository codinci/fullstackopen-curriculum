const dummy = require("../utils/dummy")

describe("a dummy test", () => {
  test("dummy returns one", () => {
    const blog = [];

    const result = dummy(blog);
    expect(result).toBe(1);
  });
});

