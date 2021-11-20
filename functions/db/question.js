const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addQuestion = async (client, title, wordNum) => {
    const { rows } = await client.query(
        `
        INSERT INTO question 
        (title, word_num) 
        VALUES 
        ($1, $2)
        RETURNING *
        `,
        [title, wordNum]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getAllQuestion = async(client) => {
    const { rows } = await client.query(
        `
        SELECT question_id, title FROM "question" q
        WHERE is_deleted = FALSE
        `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getOneQuestion = async (client, id) => {
    const { rows } = await client.query(
      `
      SELECT question_id, title, word_num FROM "question" q
      WHERE question_id = $1
      `,
      [id],
    );
  
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

module.exports = { addQuestion, getAllQuestion, getOneQuestion };