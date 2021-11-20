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

// const getUserById = async (client, userId) => {
//   const { rows } = await client.query(
//     `
//     SELECT * FROM "user" u
//     WHERE id = $1
//       AND is_deleted = FALSE
//     `,
//     // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적습니다.
//     // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 됩니다!
//     [userId],
//   );
//   // 위의 getAllUsers와는 달리, 이번에는 유저 하나만 가져오고 싶기 때문에 rows[0]만 리턴해 줍니다.
//   return convertSnakeToCamel.keysToCamel(rows[0]);
// };

// const updateUser = async (client, username, phone, userId) => {
//   const { rows: existingRows } = await client.query(
//     `
//     SELECT * FROM "user"
//     WHERE id = $1
//        AND is_deleted = FALSE
//     `,
//     [userId],
//   );

//   if (existingRows.length === 0) return false;

//   const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { username, phone });

//   const { rows } = await client.query(
//     `
//     UPDATE "user" u
//     SET username = $1, phone = $2, updated_at = now()
//     WHERE id = $3
//     RETURNING * 
//     `,
//     [data.username, data.phone, userId],
//   );
//   return convertSnakeToCamel.keysToCamel(rows[0]);
// };

// const deleteUser = async (client, userId) => {
//   const { rows } = await client.query(
//     `
//     UPDATE "user" u
//     SET is_deleted = TRUE, updated_at = now()
//     WHERE id = $1
//     RETURNING *
//     `,
//     [userId],
//   );

//   return convertSnakeToCamel.keysToCamel(rows[0]);
// };

module.exports = { getAllAnswers, getOneAnswer, getAnswerNum, updateAnswer, completeAnswer };