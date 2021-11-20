const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getBest = async (client) => {
  const { rows } = await client.query(
    `
    SELECT question_title, answer_word FROM "best" b
    `,
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getBest };