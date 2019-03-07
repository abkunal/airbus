/**
 * This lambda function fetches the news feed from the MySQL database
 */

// dependencies
const mysql = require('mysql');
const util = require('util');

if (typeof pool === 'undefined') {
  // connect to database
  var pool = mysql.createPool({
    host: process.env.RDS_ENDPOINT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
  });

  // for async await
  pool.query = util.promisify(pool.query);
}

/**
 * Returns the response of the request
 * @param {Object} body
 */
function generateBody(statusCode, body, headers = {}) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      ...headers
    }
  }
}

// handle the request
exports.handler = async (event, context) => {
  try {
    let page = 0;

    // if page is given, use it
    if (event.queryStringParameters && event.queryStringParameters.page) {
      page = Number(event.queryStringParameters.page);
    }

    // given page number is not a number
    if (!Number.isFinite(page)) page = 0;

    // fetch newsfeed from the database based on the page number
    let newsfeed = await pool.query(`SELECT * FROM newsfeed LIMIT 10 OFFSET ?`, 
      [10 * page]);

    // return newsfeed
    return generateBody(200, {
      newsfeed,
    });
  } catch (err) {
    console.log('ERROR', err);
    return generateBody(500, {
      error: 'Some error occurred. Please try again',
    });
  }
};
