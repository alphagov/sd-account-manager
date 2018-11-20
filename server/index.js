const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');
const models = require('./models');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const schema = require('./schema/schema');

const morgan = require('morgan');

// connect to db
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true, poolSize: 10 }
  )
  .then(
    () => {
      console.log('Database connection successful');
    },
    (err) => {
      console.log(err);
    }
  );

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'accmanager',
    maxAge: 8 * 60 * 60 * 1000, // 8 hrs while in dev
    keys: [keys.cookieKey]
  })
);

// passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5060;

app.listen(PORT);
