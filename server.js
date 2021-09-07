const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const data = require('./data/data.json')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Wallet {
    id: Int
    bitcoinAddress: String
    secretKey: String
    amount: Float
  }

  type WalletInput {
    id: Int
    bitcoinAddress: String
    secretKey: String
    amount: Float
  }

  type Query {
      wallets: [Wallet]
      wallet(id: Int!): Wallet 
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  wallets: () => {
    return data;
  },
  wallet: (args) => {
    if(args){
        return data.filter(wallet => {
            return wallet.id == args.id;
        })[0];
    }else{
        "nothing found"
    }
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');