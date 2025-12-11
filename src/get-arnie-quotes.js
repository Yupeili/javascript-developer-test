const { httpGet } = require('./mock-http-interface');

/**
 * Api caller.
 * @param {string} str stringified json string.
 * @returns {string} response message.
 */
const parseResponse = (str) => {
  try {
    return JSON.parse(str).message
  }catch(e){
    return ''
  }
}

/**
 * Api caller.
 * @param {string[]} urls api urls.
 * @returns {{status: number; body: string;}[]} an array of response.
 */
const getArnieQuotes = async (urls) => {
  const results = await Promise.all(urls.map(url=> httpGet(url)));
  return results.map(res => res.status === 200 ? ({
    'Arnie Quote': parseResponse(res.body)
  }) : ({ 'FAILURE': parseResponse(res.body) }))
};

module.exports = {
  getArnieQuotes,
};
