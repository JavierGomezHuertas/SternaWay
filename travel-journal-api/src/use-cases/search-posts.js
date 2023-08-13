const dbService = require("../services/db-service.js");

module.exports = async ({ search, orderby, order }) => {
    const posts = await dbService.searchByTerm(search, orderby, order);
    return posts;
};
