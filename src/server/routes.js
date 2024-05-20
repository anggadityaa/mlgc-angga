const { getHistoriesHandler, postPredictHandler } = require('../server/handler'); // Import the new handler

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },
  {
    path: '/predict/histories', // Define the new endpoint path
    method: 'GET', // Specify the HTTP method
    handler: getHistoriesHandler // Specify the handler for this endpoint
  }
];

module.exports = routes;
