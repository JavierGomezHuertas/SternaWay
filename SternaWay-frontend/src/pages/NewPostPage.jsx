import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormImage } from "../components/forms/FormImage.jsx";
import { FormInput } from "../components/forms/FormInput.jsx";
import { FormTextarea } from "../components/forms/FormTextarea.jsx";
import { FormSelect } from "../components/forms/FormSelect.jsx";
import { sendCreatePost } from "../api/send-create-post.js";
import countryData from "../example-data/countries.json";
import { uploadPostPhotos } from "../api/upload-post-photos.js";
import { Button } from "../components/forms/Button.jsx";
import { PageSubtitle } from "../components/utils/PageSubtitle.jsx";
import { Form } from "../components/forms/Form.jsx";
import { useRequireUser } from "../hooks/use-require-user.js";
// Obtener los nombres de los países del archivo JSON
const countryNames = countryData
    .map((c) => ({
        value: c.name.nativeName.spa?.common ?? c.name.common,
    }))
    .sort((a, b) => {
        return a.value.localeCompare(b.value); /// (-1, +1)
    });
export function NewPostPage() {
    useRequireUser();

    const [payload, setPayload] = useState({
        title: "",
        description: "",
        place: "",
    });

    const [photos, setPhotos] = useState([]);

    const navigate = useNavigate();
    
    const MAX_UPLOAD_IMAGES = 6;

async function onSubmit() {
    try {
        if (!payload.place) {
            console.error("Porfavor selecciona un Pais.");
            return;
        }

        if (photos.length > MAX_UPLOAD_IMAGES) {
            console.error("Solo puedes subir 6 Imagenes.");
            return;
        }

        const { id } = await sendCreatePost(payload);
        await uploadPostPhotos(id, photos);

        setTimeout(() => {
            navigate("/posts/" + id);
        }, 300); // Espera 300 ms antes de navegar
    } catch (err) {
        //TODO: Mostrar notificaciones
        console.error(err);
    }
}


    return (
        <Form onSubmit={onSubmit}>
            <PageSubtitle>Create a New Post</PageSubtitle>
            <FormInput
                placeholder="Título"
                name="title"
                type="text"
                onChange={(value) => setPayload({ ...payload, title: value })}
            />
            <FormTextarea
                placeholder="Description"
                name="description"
                onChange={(value) =>
                    setPayload({ ...payload, description: value })
                }
            />
            <FormImage
                label="Pictures (Max6)"
                name="photos"
                onChange={(value) => setPhotos(value)}
            />
            <FormSelect
                label="Place"
                options={countryNames}
                onChange={(value) => setPayload({ ...payload, place: value })}
            />
            <Button type="submit" className={"large right primary spaced"}>
                Enviar
            </Button>
        </Form>
    );
}
