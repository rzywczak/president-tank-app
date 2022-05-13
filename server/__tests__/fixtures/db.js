const mongoose = require('mongoose')
const request = require("supertest");
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Tank = require('../../src/models/tank')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Ola',
    email: 'ola@ola.pl',
    password: '123456789',
    country: 'United States',
    atomicButton: true,
    tokens: [{
        token: jwt.sign( {_id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Rafaello',
    email: 'Rafael@ola.pl',
    password: '123456789',
    country: 'United States',
    atomicButton: true,
    tokens: [{
        token: jwt.sign( {_id: userOneId }, process.env.JWT_SECRET)
    }]
}

const tankOne = {
    _id: new mongoose.Types.ObjectId(),
    sideNumber: "T123",
    producent: "American Samoa",
    model: "123456789",
    currentModification: "20",
    productonYear: 2004,
    introductionToCountry: "2004-02-04",
    course: 123,
    ammunition: 123,
    armorSide: 123,
    armorFront: 123,
    armorBack: 123,
    owner: userOne._id
}

const tankTwo = {
    _id: new mongoose.Types.ObjectId(),
    sideNumber: "2T123",
    producent: "American Samoa",
    model: "123456789",
    currentModification: "20",
    productonYear: 2004,
    introductionToCountry: "2004-02-04",
    course: 123,
    ammunition: 123,
    armorSide: 123,
    armorFront: 123,
    armorBack: 123,
    owner: userTwo._id
}

const tankThree = {
    _id: new mongoose.Types.ObjectId(),
    sideNumber: "3T123",
    producent: "American Samoa",
    model: "123456789",
    currentModification: "20",
    productonYear: 2004,
    introductionToCountry: "2004-02-04",
    course: 123,
    ammunition: 123,
    armorSide: 123,
    armorFront: 123,
    armorBack: 123,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Tank.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Tank(tankOne).save()
    await new Tank(tankTwo).save()
    await new Tank(tankThree).save()
}

const closeConnectDB = async () => {
    await mongoose.connection.close()
}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    tankOne,
    tankTwo,
    setupDatabase,
    closeConnectDB
}