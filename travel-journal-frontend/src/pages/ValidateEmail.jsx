import { useNavigate, useSearchParams } from "react-router-dom";
import { FormInput } from "../components/forms/FormInput.jsx";
import { Button } from "../components/forms/Button.jsx";
import { useState } from "react";
import { sendValidationCode } from "../api/send-validation-code.js";
import { Form } from "../components/forms/Form.jsx";

export function ValidateEmail() {
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    const email = queryParams.get("email");

    const [code, setCode] = useState();

    async function submitCode() {
        try {
                  await sendValidationCode({
                    email,
                  code,
                });
            navigate("/login");
        } catch (err) {
            //TODO(piarrot): Hacer algo con el error
            console.error(err);
        }
    }

    return (
        <Form onSubmit={submitCode}>
            <h2>Validate Email</h2>
            <p>Enviamos un email a {email}</p>
            <p>Escribe el código para validar tu email</p>
            <FormInput onChange={setCode} />
            <Button type={"submit"}>Enviar</Button>
        </Form>
    );
}
