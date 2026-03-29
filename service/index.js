const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

app.use(express.static('public'));

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    console.log("Create Body:", req.body);

    const username = req.body.username; 
    const password = req.body.password;

    if (await DB.getUser(username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(username, password);
        setAuthCookie(res, user.token);

        await DB.addLogin({
            name: username,
            time: new Date().toLocaleDateString()
        });

        res.send({ username: user.username });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await DB.getUser(username);
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
        user.token = uuid.v4();
        await DB.updateUserToken(user.username, user.token);
        setAuthCookie(res, user.token);

        await DB.addLoginEvent({
            name: username,
            time: new Date().toLocaleDateString()
        });

        res.send({ username: user.username });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUserByToken(req.cookie[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// endpoint for Community page to fetch login list
apiRouter.get('/logins', async (req, res) => {
    const logins = await DB.getLogins();
    res.send(logins)    
});

// test like simon exapmple
var testdata = {test:"testdata"}
apiRouter.get('/test', (_req, res) => {
  console.log("In test")
  res.send(testdata);
});

// Get community updates
apiRouter.get('/community-updates', async (_req, res) => {
  console.log("In community");
  const communityUpdates = await DB.getCommunityUpdates();
  // eventually gonnna return list of community updates here
  res.send(communityUpdates);
});

// Update a user's watchlist
apiRouter.post('/update-watchlist', verifyAuth, async (req, res) => {
    console.log("In update watchlist");
    const userSelectionUpdate = req.body;

    await DB.addWatchlistUpdate(userSelectionUpdate)

    console.log(`${userSelectionUpdate.user} started tracking ${userSelectionUpdate.asset}`);
    res.status(200).send({ msg: `${userSelectionUpdate.asset} added to watchlist` })
});

// endpoint for Dashboard to fetch inflation rate
apiRouter.get('/proxy/inflation', async (req, res) => {
    console.log("Backend received a request for inflation!"); // Check your terminal for this!
    try {
        const response = await fetch('https://api.worldbank.org/v2/country/US/indicator/FP.CPI.TOTL.ZG?format=json&per_page=5');        const data = await response.json();
        const observations = data[1];
        const latestValid = observations.find(obs => obs.value !== null);

        if (latestValid) {
                res.send({ rate: latestValid.value.toFixed(2) + '%' });
            } else {
                res.status(404).send({ error: 'No data found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Server Error' });
    }
});

// endpoint for Dashboard to fetch fed funds rate
apiRouter.get('/proxy/rate', async (req, res) => {
    try {
        const apiKey = 'YZ49FYHNUH15FWSD'; 
        const response = await fetch(`https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${apiKey}`);
        const data = await response.json();
        
        if (data && data.data && data.data[0]) {
            const latestRate = data.data[0].value;
            res.send({ rate: latestRate + '%' });
        } else {
            console.error("Alpha Vantage structure mismatch:", data);
            res.send({ rate: 'Limit hit' }); // Hardcoded fallback so your UI doesn't say "error"
        }
    } catch (error) {
        res.send({ rate: 'Server Error' }); 
    }
});

// endpoint for Dashboard to fetch MANU price
apiRouter.get('/proxy/manu', async (req, res) => {
    try {
        const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/MANU');
        const data = await response.json();
        const price = data.chart.result[0].meta.regularMarketPrice;
        res.send({ price: `$${price}` });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch MANU" });
    }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
