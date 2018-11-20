const passport = require('passport');
const CustomStrategy = require('passport-custom');
const mongoose = require('mongoose');
const axios = require('axios');

const keys = require('../config/keys');

const Tech = mongoose.model('techs');

const sessionURI = keys.whdURI + 'Session';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Tech.findById(id).then((user) => {
    const { id, firstName, lastName, apiKey } = user;
    done(null, { id, firstName, lastName, apiKey });
  });
});

passport.use(
  'whd',
  new CustomStrategy(async (user, done) => {
    const { username, password } = user.body;
    const response = await axios.get(sessionURI, {
      params: {
        username,
        password
      }
    });
    if (response.data) {
      console.log(response.data);
      // if we get a valid response find them in the database
      const existingTech = await Tech.findOne({
        techId: response.data.currentTechId
      });
      if (existingTech) {
        return done(null, existingTech);
      } else {
        // create a new user....this won't include the API key
        // or their name details......
        const newTech = await new Tech({
          techId: response.data.currentTechId
        }).save();
        return done(null, newTech);
      }
    } else {
      // if we get an error back.....
      return done(response.error, user);
    }
  })
);

function login({ username, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('whd', (err, user) => {
      if (!user) {
        reject('Invalid credentials.');
      }

      req.login(user, () => resolve(user));
    })({ body: { username, password } });
  });
}

module.exports = { login };
