const request = require("supertest");

const app = require("../../server");

describe("test login controller", () => {
  //   let server;
  beforeAll(() => {
    console.log("before all");
    // server = app.listen(3001);
  });
  afterAll(() => {
    console.log("after all");
    app.close();
    // server.close(done);
  });

  test("login test", async () => {
    const testUser = {
      email: "rusi11@gmail.com",
      password: "12345678",
    };

    const response = await request(app).post("/api/users/login").send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
    expect(response.body.data.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
      })
    );
  });
});
