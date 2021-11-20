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

module.exports = { addQuestion };