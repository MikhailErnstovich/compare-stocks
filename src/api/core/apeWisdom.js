import axios from 'axios';
import prepareRequest from './modules/prepareRequest.js';
import prepareResponse from './modules/prepareResponse.js';

const instance = axios.create({
  baseURL: '/api',
  crossdomain: true,
  headers: { 'Content-Type': 'application/json' },
});

export default async function(params) {
  const reqParams = prepareRequest(params);
  try {
    const data = await instance(reqParams);
    return prepareResponse(data);
  }
  catch (err) {
    throw err;
  }
};