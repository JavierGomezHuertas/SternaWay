module.exports = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res);
    } catch (error) {
      next(error);
    }
  };
};
