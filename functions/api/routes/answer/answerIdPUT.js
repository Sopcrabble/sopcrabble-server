const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { answerDB } = require('../../../db');

module.exports = async (req, res) => {

  const { id } = req.params;
  const { word } = req.body;

  if (!id || !word) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  
  let client;
  
  try {
    client = await db.connect(req);

    const updatedAnswer = await answerDB.updateAnswer(client, id, word)
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_ANSWER_SUCCESS, updatedAnswer));

    const wordNum = await answerDB.getAnswerNum(client, id);
    console.log(wordNum)
    if (!wordNum) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.OUT_OF_VALUE));
    
    if(word.length === wordNum) {
        await answerDB.completeAnswer(client, id);
    }
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};