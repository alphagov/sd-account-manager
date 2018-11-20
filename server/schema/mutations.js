const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/passport');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    }
  }
});

module.exports = mutation;
