
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';

const app = feathers();

const restClient = rest('http://localhost:4100');

app.configure(restClient.axios(axios));

module.exports = app;




