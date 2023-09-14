const { getUserInfoByUserId} = require("../services/db-service.js");

module.exports = async (userId) => {
    const userInfo = await getUserInfoByUserId(userId);

    return userInfo;
};
