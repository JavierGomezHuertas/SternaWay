import { useNavigate } from "react-router-dom";

// Esta función devuelve el título de la página
export function PageTitle() {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/");
    };

    return (
        <h1 className="mainTitle" onClick={handleTitleClick}>
            Sterna
        </h1>
    );
}
