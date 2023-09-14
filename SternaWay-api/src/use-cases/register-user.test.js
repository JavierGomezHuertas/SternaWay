const dbService = require("../services/db-service.js");
const registerUser = require("./register-user.js");

(async () => {
  const result = await registerUser({
    email: "pablo@test.com",
    password: "user1234",
    birthDate: new Date(1990, 1, 12),
    country: "Argentina",
    acceptedTOS: true,
  });

  console.log(result);
  console.log(await dbService.getAllUsers());
})();
