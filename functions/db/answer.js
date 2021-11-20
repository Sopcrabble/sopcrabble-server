const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllAnswers = async (client, id) => {
  const { rows } = await client.query(
    `
    SELECT q.question_id, title, a.word_num, answer_id, word, like_num FROM "answer" a JOIN "question" q
    ON a.question_id = q.question_id
    WHERE q.question_id = $1
    AND like_num != 0
    ORDER BY like_num DESC 
    `,
    [id],
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

const getOneAnswer = async (client, id) => {
  const { rows } = await client.query(
    `
    SELECT q.question_id, answer_id, word FROM "answer" a JOIN "question" q
    ON a.question_id = q.question_id
    WHERE q.question_id = $1
    AND   like_num = 0
    `,
    [id],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getAnswerById = async (client, id, answerId) => {
  const { rows } = await client.query(
    `
    UPDATE "answer" a
    SET like_num = like_num + 1, updated_at = now()
    WHERE question_id = $1
    AND answer_id = $2
    RETURNING question_id, answer_id, like_num
    `,
    [id, answerId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllAnswers, getOneAnswer, getAnswerById };