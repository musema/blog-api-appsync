"use strict";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports').default;
// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

global.WebSocket = require('ws');
global.window= {
 setTimeout: setTimeout,
 clearTimeout: clearTimeout,
 WebSocket: global.WebSocket,
 ArrayBuffer: global.ArrayBuffer,
 addEventListener: function () { },
 navigator: { onLine: true }
};



const url = aws_exports.ENDPOINT;
const region = aws_exports.REGION;
//const type = AUTH_TYPE.AWS_IAM;

// If you want to use API key-based auth
const apiKey = 'xxxxxxxxx';
// If you want to use a jwtToken from Amazon Cognito identity:
const jwtToken = 'xxxxxxxx';

// Import gql helper and craft a GraphQL query
const gql = require('graphql-tag');
const query = gql(`
query AllBlogs {
    getBlogs{
        blogId
      }
}`);

// Set up Apollo client
const client = new AWSAppSyncClient({
    url: 'https://hjzomrwwunfnbikang3y6r3n6m.appsync-api.us-east-1.amazonaws.com/graphql',
    region: 'us-east-1',
    auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: 'da2-hlsxrjlkjzawpcvc3oaxezgfum',
   // credentials: credentials,
    }
   });

   client.hydrated().then(function (client) {
    //Now run a query
    //client.query({ query: query })
    client.query({ query: query, fetchPolicy: 'network-only' }) //Uncomment for AWS  Lambda
 .then(function logData(data) {
 console.log('results of query: ', data);
 console.log('Here is JSON:'+JSON.stringify(data));
 })
 .catch('errorrrrrrrrrrr'+console.error);

 });
 
