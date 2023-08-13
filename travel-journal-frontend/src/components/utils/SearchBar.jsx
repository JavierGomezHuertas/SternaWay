import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "../forms/Form.jsx";
import { FormInput } from "../forms/FormInput.jsx";
import { FormSelect } from "../forms/FormSelect.jsx";
export function SearchBar() {
    // Obtener la ubicación actual
    const location = useLocation();
    // Obtener la función de navegación
    const navigate = useNavigate();
    // Estado para almacenar el valor de búsqueda
    const [search, setSearch] = useState("");
    // Obtener los parámetros de búsqueda de la URL
    const [queryParams, setQueryParams] = useSearchParams();
    // Estado para controlar la posición del formulario
    const [isFormAtTop, setIsFormAtTop] = useState(false);
    // Actualizar el valor de búsqueda cuando cambie los parámetros de búsqueda
    const [order, setOrder] = useState("");
    const [orderBy, setOrderBy] = useState("");

    const handleOrderByChange = (value) => {
        setOrderBy(value);
    };

    const searchParams = { q: search };
    if (orderBy) searchParams.orderby = orderBy;
    if (order) searchParams.order = order;

    useEffect(() => {
        if (location.pathname !== "/search") {
            setSearch("");
        } else {
            const search = queryParams.get("q");
            setSearch(search || "");
        }
    }, [location, queryParams]);
    const onSearch = () => {
        if (location.pathname !== "/search") {
            navigate("/search?" + new URLSearchParams(searchParams));
        } else {
            setQueryParams(searchParams);
        }
    };

    const onSearchChange = (value) => {
        setSearch(value);

        searchParams.q = value;
    };

    const handleOrderChange = (value) => {
        setOrder(value);

        searchParams.order = value;
    };
    // Manejar el evento de scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 200;
            if (scrollY > threshold) {
                setIsFormAtTop(true);
            } else {
                setIsFormAtTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <Form
            className={`SearchBar ${isFormAtTop ? "inlineAtTop" : "inline"}`}
            onSubmit={onSearch}
        >
            <FormInput
                type="search"
                placeholder="Search a Place here..."
                value={search}
                onChange={onSearchChange}
                iconPrefix={"search"}
            />
            <div className="filter">
                <FormSelect
                    value={orderBy}
                    onChange={handleOrderByChange}
                    options={[
                        { value: "date", label: "Fecha" },
                        { value: "likes", label: "Likes" },
                    ]}
                />
                <FormSelect
                    value={order}
                    onChange={handleOrderChange}
                    options={[
                        { value: "desc", label: "Descendente" },
                        { value: "asc", label: "Ascendente" },
                    ]}
                />
            </div>
        </Form>
    );
}
