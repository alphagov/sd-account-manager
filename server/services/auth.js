const mongoose = require('mongoose');

const Tech = mongoose.model('techs');

module.exports = {
  enrol: async ({ req, firstName, lastName, apiKey }) => {
    const { user } = req;

    const existingTech = await Tech.findByIdAndUpdate(
      user.id,
      { $set: { firstName, lastName, apiKey } },
      { new: true }
    );
    return existingTech;
  }
};
