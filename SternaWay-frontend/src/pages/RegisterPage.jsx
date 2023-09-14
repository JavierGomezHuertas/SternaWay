// Importaciones
import { useState } from "react";
import { sendRegister } from "../api/send-register.js";
import { Button } from "../components/forms/Button.jsx";
import { FormCheckbox } from "../components/forms/FormCheckbox.jsx";
import { FormInput } from "../components/forms/FormInput.jsx";
import { FormSelect } from "../components/forms/FormSelect.jsx";
import countryData from "../example-data/countries.json";
import { useNavigate } from "react-router-dom";
import { PageSubtitle } from "../components/utils/PageSubtitle.jsx";
import { Form } from "../components/forms/Form.jsx";
import { useRequireAnon } from "../hooks/use-require-anon.js";
// Obtener los nombres de los países del archivo JSON
const countryNames = countryData
    .map((c) => ({
        value: c.name.nativeName.spa?.common ?? c.name.common,
    }))
    .sort((a, b) => {
        return a.value.localeCompare(b.value); /// (-1, +1)
    });
export function RegisterPage() {
    // Verificar si el usuario es anónimo
    useRequireAnon();
    const [payload, setPayload] = useState({});
    const navigate = useNavigate();
    // Función para enviar el formulario
    async function onFormSubmit() {
        try {
            await sendRegister(payload);
            // Momento de éxito, el usuario se pudo registrar
            navigate(`/auth/validate-email?email=${payload.email}`);
        } catch (err) {
            // TODO: Hacer algo con el error
            console.log(err);
        }
    }
    return (
        <Form onSubmit={onFormSubmit}>
            <PageSubtitle>Sign up</PageSubtitle>
            <FormInput
                name="name"
                placeholder="Full Name"
                type="text"
                onChange={(value) => setPayload({ ...payload, name: value })}
            />
            <FormInput
                name="email"
                placeholder="E-mail"
                type="email"
                onChange={(value) => setPayload({ ...payload, email: value })}
            />
            <FormInput
                name="password"
                placeholder="Password"
                type="password"
                onChange={(value) =>
                    setPayload({ ...payload, password: value })
                }
            />
            <FormInput
                name="birthDate"
                label="Birth of date"
                type="date"
                onChange={(value) =>
                    setPayload({ ...payload, birthDate: value })
                }
            />
            <FormSelect
                label="Country"
                options={countryNames}
                onChange={(value) => setPayload({ ...payload, country: value })}
            />
            <FormCheckbox
                name="acceptedTOS"
                label="I agree to the Terms of Service"
                onChange={(value) =>
                    setPayload({ ...payload, acceptedTOS: value })
                }
            />
            <Button className="primary large right spaced" type={"submit"}>
                Sign up
            </Button>
        </Form>
    );
}
