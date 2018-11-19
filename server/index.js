const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const morgan = require('morgan');

require('./models/tech');
require('./services/passport');

// connect to db
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true, poolSize: 10 }
  )
  .then(
    () => {
      console.log('Database conenction successful');
    },
    (err) => {
      console.log(err);
    }
  );

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'accmanager',
    maxAge: 8 * 60 * 60 * 1000, // 8 hrs while in dev
    keys: [keys.cookieKey]
  })
);

app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true
  })
);

// passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5060;

app.listen(PORT);
