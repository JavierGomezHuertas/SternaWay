//error.details[i].context.key = campo
//error.details[i].message = mensaje de error

export function createFormErrorsFromJoiDetails(joiErrorDetails) {
  const myErrors = {};

  joiErrorDetails.forEach((errorData) => {
    myErrors[errorData.context.key] = errorData.message;
  });

  return myErrors;
}
