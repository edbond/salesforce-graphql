import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    todo(
      limit: Int,
      offset: Int,
      orderBy: [Todo_OrderByInput],
      where: Todo_FilterInput,
      first: Int,
      after: String
    ): Todo_Connection
    node(id: ID!): Node
  }

  type Mutation {
    create_Todo(input: Todo_CreateInput!): Todo
    delete_Todo(id: ID!): Todo
    update_Todo(input: Todo_UpdateInput!): Todo
  }

  type Todo implements Node {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Todo_Connection {
    edges: [Todo_Edge]
    pageInfo: PageInfo!
  }

  type Todo_Edge {
    cursor: String!
    node: Todo
  }

  input Todo_CreateInput {
    title: String!
    completed: Boolean!
  }

  input Todo_UpdateInput {
    id: ID!
    title: String
    completed: Boolean
  }

  input Todo_FilterInput {
    and: [Todo_FilterInput]
    not: Todo_FilterInput
    or: [Todo_FilterInput]
    id: IDOperator
    title: StringOperator
    completed: BooleanOperator
    createdAt: StringOperator
    updatedAt: StringOperator
  }

  input Todo_OrderByInput {
    id: OrderByClause
    title: OrderByClause
    completed: OrderByClause
    createdAt: OrderByClause
    updatedAt: OrderByClause
  }
      
  interface Node {
      id: ID!
  }

  enum NullsOrder {
      NULLS_FIRST
      NULLS_LAST
  }

  input OrderByClause {
      direction: Direction
      nulls: NullsOrder
  }

  type PageInfo {
      endCursor: String
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
  }

  input StringOperator {
      eq: String
      gt: String
      ge: String
      in: [String]
      like: String
      lt: String
      le: String
      ne: String
      nin: [String]
  }

  input BooleanOperator {
      eq: Boolean
      gt: Boolean
      gebolded: Boolean
      in: [Boolean]
      like: Boolean
      lt: Boolean
      le: Boolean
      ne: Boolean
      nin: [Boolean]
  }

  enum Direction {
      ASC
      DESC
  }

  input FloatOperator {
      eq: Float
      gt: Float
      ge: Float
      in: [Float]
      like: Float
      lt: Float
      le: Float
      ne: Float
      nin: [Float]
  }

  input IDOperator {
      eq: ID
      gt: ID
      ge: ID
      in: [ID]
      like: ID
      lt: ID
      le: ID
      ne: ID
      nin: [ID]
  }

  input IntOperator {
      eq: Int
      gt: Int
      ge: Int
      in: [Int]
      like: Int
      lt: Int
      le: Int
      ne: Int
      nin: [Int]
  }
`;