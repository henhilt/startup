const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const updateCollection = db.collection('update');
const loginCollection = db.collection('login');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}

async function updateUserToken(username, token) {
  await userCollection.updateOne({ username: username }, { $set: {token: token} });
}

async function logoutUser(token) {
  await userCollection.updateOne({ token: token }, { $unset: { token: 1 } });
}

function addLogin(loginEntry) {
  return loginCollection.insertOne(loginEntry);
}

function getLogins() {
  return loginCollection.find().sort({ _id: -1 }).limit(10).toArray();
}

function addWatchlistUpdate(update) {
  return updateCollection.insertOne(update);
}

function getCommunityUpdates() {
  return updateCollection.find().sort({ _id: -1 }).limit(4).toArray();
}

async function updateUserWatchlist(username, watchlist) {
  return userCollection.updateOne(
    { username: username },
    { $set: { watchlist: watchlist } }
  );
}

// get user specific dashboard settings
async function getUserWatchlist(username) {
  const user = await userCollection.findOne({ username: username });
  return user?.watchlist || { 'CPI': false, 'FEDFUNDS': false, 'MANU': false };
}

// update user specific dashboard settings
async function updateUserWatchlist(username, watchlist) {
  return await userCollection.updateOne(
    { username: username },
    { $set: { watchlist: watchlist } }
  );
}

module.exports = { 
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  logoutUser,
  addLogin,
  getLogins,
  addWatchlistUpdate,
  getCommunityUpdates,
  updateUserWatchlist,
  getUserWatchlist,
  updateUserWatchlist
};
