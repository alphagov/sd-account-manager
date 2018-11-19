const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/passport');

const mutation = new GraphQLObjectType({
  name: 'Mutation'
});
