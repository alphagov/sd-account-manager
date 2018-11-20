const mongoose = require('mongoose');
const passport = require('passport');

const Tech = mongoose.model('techs');

const enrol = async ({ req, firstName, lastName, apiKey }) => {
  const { user } = req;

  const existingTech = await Tech.findByIdAndUpdate(
    user.id,
    { $set: { firstName, lastName, apiKey } },
    { new: true }
  );
  return existingTech;
};

const login = async ({ username, password, req }) => {
  return await passport.authenticate('whd', (err, user) => {
    if (!user) {
    } //need to fix this......
  });
};

module.export = { enrol, login };
