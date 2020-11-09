const { formatArticles } = require("../db/utils/data-manipulation");

describe("formatArticles", () => {
  it("Returns a new empty array when passed an empty array", () => {
    const input = [];
    expect(formatArticles(input)).toEqual([]);
    expect(formatArticles(input)).not.toBe(input);
  });
  it("Returns an array of objects containing the expected keys", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(formatArticles(input)).toEqual([
      {
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.anything(),
        votes: expect.any(Number),
      },
    ]);
  });
  it("changes the format of created_at timestamp to match SQL format", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(formatArticles(input)).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "11-15-2018 12:21:54",
        votes: 100,
      },
    ]);
  });
});
