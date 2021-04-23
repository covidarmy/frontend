const { connectToDatabase } = require("./mongo")

/**
 * @param {import("~/types").Cities} cities
 * @param {import("~/types").Resources} resources
 * @param {string[]} filterAccounts
 */
module.exports.fetchTweets = async (cities, resources, filterAccounts) => {
  const db = connectToDatabase()
}
