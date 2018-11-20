const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

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
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentvalue, { username, password }, req) {
        return AuthService.login({ username, password, req });
      }
    },
    enrol: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        apiKey: { type: GraphQLString }
      },
      resolve(parentvalue, { firstName, lastName, apiKey }, req) {
        return AuthService.enrol({ firstName, lastName, apiKey, req });
      }
    }
  }
});

module.exports = mutation;
