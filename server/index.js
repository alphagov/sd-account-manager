const express = require('express');
const expressGraphQL = require('express-graphql');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(
  '/graphql',
  expressGraphQL({
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
