module.exports = (res, err) => {
  res.status(err.status ?? 500).json({
    success: false,
    error: {
      code: err.code ?? "UNEXPECTED_ERROR",
      msg: err.message ?? "An unexpected error ocurred",
    },
  });
};
