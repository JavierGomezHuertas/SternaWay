module.exports = {
  invalidCredentials() {
    throw {
      status: 400, //Bad Request
      code: "INVALID_CREDENTIALS",
      message: "Credenciales inválidas",
    };
  },
  emailNotValidated() {
    throw {
      status: 400, //Bad Request
      code: "EMAIL_NOT_VALIDATED",
      message: "El email de este usuario aún no ha sido validado",
    };
  },
  notAuthenticated() {
    throw {
      status: 401, //401 Unauthorized
      code: "NOT_AUTHENTICATED",
      message: "Debe enviar un token en el header 'Authorization'",
    };
  },
  unauthorizedUser() {
    throw {
      status: 403, //403 Forbidden
      code: "UNAUTHORIZED",
      message: "El usuario no está autorizado para hacer esta operación",
    };
  },
  didNotAcceptTOS() {
    throw {
      status: 400, //Bad Request
      code: "DID_NOT_ACCEPT_TOS",
      message:
        "El usuario debe aceptar los términos y condiciones para registrarse",
    };
  },
  notFound() {
    throw {
      status: 404, //NOT FOUND
      code: "RESOURCE_NOT_FOUND",
      message: "El recurso requerido no existe",
    };
  },
  emailAlreadyRegistered() {
    throw {
      status: 400, //Bad Request
      code: "EMAIL_ALREADY_REGISTERED",
      message: "El email ya está registrado",
    };
  },
  invalidValidationCode() {
    throw {
      status: 400, //Bad Request
      code: "INVALID_VALIDATION_CODE",
      message: "El código de validación es inválido",
    };
  },
};
