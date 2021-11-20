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

const getAnswerNum = async (client, id) => {
  const { rows } = await client.query(
    `
    SELECT word_num FROM "question" q
    WHERE q.question_id = $1
    `,
    [id],
  );
  return convertSnakeToCamel.keysToCamel(rows[0].word_num);
};

const updateAnswer = async (client, id, word) => {
  const { rows } = await client.query(
    `
    UPDATE "answer" a
    SET word = $1
    WHERE question_id = $2
    AND is_completed = false
    RETURNING * 
    `,
    [word, id],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
}

const completeAnswer = async (client, id) => {
  const { rows } = await client.query(
    `
    UPDATE "answer" a
    SET is_completed = true
    WHERE question_id = $1
    AND is_completed = false
    RETURNING * 
    `,
    [id],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
}

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

const addAnswer = async (client, id, wordNum) => {
  const { rows } = await client.query(
      `
      INSERT INTO answer (question_id, word_num) 
      VALUES ($1, $2)
        RETURNING *
      `,
      [id, wordNum]
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllAnswers, getOneAnswer, getAnswerNum, updateAnswer, completeAnswer, getAnswerById, addAnswer };
