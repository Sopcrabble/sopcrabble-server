const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db')
const { questionDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;
  
  try {
    client = await db.connect(req);

    const allQuestion = await questionDB.getAllQuestion(client);
    if(!allQuestion) return res.status(statusCode.BAD_REQUEST).sned(util.fail(statusCode.BAD_REQUEST,
      responseMessage.NULL_VALUE))
      
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ALL_QUESTION_SUCCESS, allQuestion));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};