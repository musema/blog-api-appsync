"use strict";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports').default;
// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

// Import gql helper and craft a GraphQL query
const gql = require('graphql-tag');

global.WebSocket = require('ws');
global.window= {
 setTimeout: setTimeout,
 clearTimeout: clearTimeout,
 WebSocket: global.WebSocket,
 ArrayBuffer: global.ArrayBuffer,
 addEventListener: function () { },
 navigator: { onLine: true }
};

const query = gql(`
query AllBlogs {
    getBlogs{
        blogId
      }
}`);


const mutation = gql(`
    mutation($blogId: ID, $topic: String, $description: String){
            addBlog(blogId: $blogId, topic: $topic, description: $description) {
              blogId
              topic
              description
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
    },
    disableOffline: true,
   });

   client.hydrated().then(function (client) {
    //Now run a query
    client.mutate({ mutation: mutation, variables:{topic: "hiting from node", description: "appsync is awsome"} })
        .then(function logData(data) {
            console.log('results of mutate: ', data);
        })
        .catch(console.error);
});
 
