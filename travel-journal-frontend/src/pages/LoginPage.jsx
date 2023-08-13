// Importaciones
import { Button } from "../components/forms/Button.jsx";
import { useContext, useState } from "react";
import { FormInput } from "../components/forms/FormInput.jsx";
import { sendLogin } from "../api/send-login.js";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/auth-context.jsx";
import { PageSubtitle } from "../components/utils/PageSubtitle.jsx";
import { Form } from "../components/forms/Form.jsx";
import { useRequireAnon } from "../hooks/use-require-anon.js";
import { createFormErrorsFromJoiDetails } from "../utils/create-form-errors.js";
import { LoginValidation } from "../validations/login-validation.js";
export function LoginPage() {
    // Requerir autenticación anónima
    useRequireAnon();
    // Estado para almacenar los datos del formulario
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });
    // Estado para almacenar los errores del formulario
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    // Contexto de autenticación y navegación
    const login = useContext(LoginContext);
    const navigate = useNavigate();
    // Función para enviar el formulario
    async function onSubmit() {
        // Validar los datos del formulario
        const result = LoginValidation.validate(payload, {
            abortEarly: false,
        });
        if (result.error) {
            setErrors(createFormErrorsFromJoiDetails(result.error.details));
            console.log("Corto el submit por la validación");
            return;
        }
        setErrors({});
        try {
            // Enviar los datos de inicio de sesión
            const { token } = await sendLogin(payload);
            login(token);
            navigate("/");
        } catch (error) {
            if (error.code == "VALIDATION_ERROR") {
                setErrors(createFormErrorsFromJoiDetails(error.details));
                return;
            }
            // Mostrar un toast / modal
            console.error(error);
        }
    }
    return (
        // Formulario de inicio de sesión
        <Form onSubmit={onSubmit}>
            <PageSubtitle>Log in</PageSubtitle>
            <FormInput
                name="email"
                type="text"
                placeholder="E-mail"
                error={errors.email}
                onChange={(value) => setPayload({ ...payload, email: value })}
            />
            <FormInput
                name="password"
                type="password"
                placeholder="password"
                error={errors.password}
                onChange={(value) =>
                    setPayload({ ...payload, password: value })
                }
            />
            <Button type="submit" className="large spaced primary right">
                Log in
            </Button>
        </Form>
    );
}
