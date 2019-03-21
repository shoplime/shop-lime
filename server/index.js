require("dotenv").config();
const express = require("express");
const massive = require("massive");
const stripe = require("stripe")("sk_test_Bd3yFBhqJGc1VKF0aM4gGY3U");
const {SERVER_PORT, DB_CONNECTION} = process.env;

const app = express();

app.use(express.json());
app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
    console.log('here', req)
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
      res.json({status});
      console.log(res)
    } catch (err) {
      res.status(500).end();
    }
  });

  massive(DB_CONNECTION).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, () =>
    console.log(`Houston we have lift off on port ${SERVER_PORT}`)
    );
  });