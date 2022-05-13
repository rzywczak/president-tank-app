const request = require("supertest");
const app = require("../src/app");
const Tank = require("../src/models/tank");
const { userOneId, userOne, userTwo, tankOne, tankTwo, setupDatabase, closeConnectDB } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create tank for user", async () => {
  const response = await request(app)
    .post("/api/tanks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send( {
        sideNumber: '4T123',
        producent: 'American Samoa',
        model: '123456789',
        currentModification: '123',
        productonYear: 2004,
        introductionToCountry: '2004-02-04',
        course: 123,
        ammunition: 123,
        armorSide: 123,
        armorFront: 123,
        armorBack: 123,
        user: userOne._id, 
    })
    .expect(201);
  const tank = await Tank.findById(response.body._id);
  expect(tank).not.toBeNull();
});

test("Should featch all tanks user ", async () => {
  const reponse = await request(app)
    .get("/api/tanks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(reponse.body.length).toEqual(1);
});

test("Should not delete tank other user", async () => {
  await request(app)
    .delete(`/api/tanks/${tankTwo._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);
  const tank = Tank.findById(tankTwo._id);
  expect(tank).not.toBeNull();
});

test("Should not create tank with invalid description/completed", async () => {
  await request(app)
    .post("/api/tanks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send( {data: {
        sideNumber: "4T123",
        producent: "American Samoa",
        model: "123456789",
        currentModification: "20",
        productonYear: 2004,
        introductionToCountry: "02-04-2004",
        course: 123,
        ammunition: 123,
        armorSide: 123,
        armorFront: 123,
        armorBack: 123,
    }})
    .expect(500);
});

test("Should not delete tank if unauthenticated", async () => {
  await request(app).delete(`/api/tanks/${tankOne}`).send().expect(401);
});

test("Should not update other users tank", async () => {
  await request(app)
    .patch(`/api/tanks/${tankOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send({data: {
        ideNumber: "4T123",
        producent: "American Samoa",
        model: "123456789",
        currentModification: "20",
        productonYear: 2004,
        introductionToCountry: "02-04-2004",
        course: 123,
        ammunition: 123,
        armorSide: 123,
        armorFront: 123,
        armorBack: 123,
        user: userTwo._id
    }})
    .expect(400);
});

test("Should fetch user tank by id", async () => {
  await request(app)
    .get(`/api/tanks/${tankOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should delete user tank", async () => {
  await request(app)
    .delete(`/api/tanks/${tankOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(204);
});

test("Should fetch user tank by id", async () => {
  await request(app).get(`/api/tanks/${tankOne._id}`).send().expect(401);
});

test("Should not fetch other users tank by id", async () => {
  await request(app)
    .get(`/api/tanks/${tankTwo._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);
});

test("Should fetch only completed tanks", async () => {
  const tanks = await request(app)
    .get(`/api/tanks/?complited=true`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should fetch only incomplete tanks", async () => {
  const tanks = await request(app)
    .get(`/api/tanks/?complited=false`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should sort tanks by description/completed/createdAt/updatedAt", async () => {
  const tanks = await request(app)
    .get(`/api/tanks/?sortBy=complited_desc`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should fetch page of tanks", async () => {
  const tanks = await request(app)
    .get(`/api/tanks/?limit=5`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
});

afterAll(closeConnectDB);
