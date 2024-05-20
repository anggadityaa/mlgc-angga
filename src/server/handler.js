const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { getHistoriesFromFirestore, storeData } = require('../services/storeData'); // Import getHistoriesFromFirestore

// Your other code remains unchanged


async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  await storeData(id,data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  })
  response.code(201);
  return response;
}

const getHistoriesHandler = async (request, h) => {
  try {
      const histories = await getHistoriesFromFirestore();
      return {
          status: 'success',
          data: histories
      };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Failed to retrieve prediction histories: ' + error.message
    };  
  }
};


module.exports = {
  getHistoriesHandler,
  postPredictHandler
};