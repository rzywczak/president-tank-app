const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, userTwo, setupDatabase, closeConnectDB } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send( {
          name: 'test@test12345.pl',
          country: 'Poland',
          email: 'test@test12345.pl',
          password: '123456789!',
          atomicButton: true,
      })
      .expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
  });

  test("Should not create user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send( {
          name: '',
          country: '',
          email: '',
          password: '',
          atomicButton: true,
      })
      .expect(400);
  });

  test("Should login user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send( {
        email: userTwo.email,
        password: userTwo.password,
      })
      .expect(200);
    expect(response.body.token).not.toBeNull();
  });

  test("Should not login user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send( {
        email: userTwo.email,
        password: 'wrongpassword',
      })
      .expect(400);
  });

afterAll(closeConnectDB);
