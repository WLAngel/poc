const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const url = require('url');
const rp = require('request-promise');

const app = express();

const graphqlEndpoint = 'https://edjjigokejg3ldptpes4nlvlwa.appsync-api.ap-northeast-1.amazonaws.com/graphql';
const region = 'ap-northeast-1';

app.use(bodyParser.json());

app.post('/graphql', (request, response) => {
  console.log(request.body);
  const uri = url.parse(graphqlEndpoint);
  const httpRequest = new aws.HttpRequest(uri.href, region);
  httpRequest.headers.host = uri.host;
  httpRequest.headers['Content-Type'] = 'application/json';
  httpRequest.method = 'POST';
  httpRequest.body = JSON.stringify(request.body);

  aws.config.credentials.get(err => {
    const signer = new aws.Signers.V4(httpRequest, 'appsync', true);
    signer.addAuthorization(aws.config.credentials, aws.util.date.getDate());

    const options = {
      uri,
      method: httpRequest.method,
      body: httpRequest.body,
      headers: httpRequest.headers,
    };

    rp(options).then(console.log);
    response.send('pew');
  });
  
});

app.listen(8080, () => {
  console.log('gogo');
});
