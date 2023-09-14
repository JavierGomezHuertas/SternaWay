import "./FormStyles.css";
import { Icon } from "../icons/Icon.jsx";
// Componente de entrada de formulario
export function FormInput({
    className,
    name,
    label,
    type,
    placeholder,
    onChange,
    value,
    defaultValue,
    iconPrefix,
    error,
}) {
    // Función para manejar el cambio en la entrada de texto
    function inputChanged(evt) {
        if (onChange) {
            onChange(evt.target.value);
        }
    }
    return (
        <div className={"inputContainer " + className}>
            {/* Etiqueta del campo de entrada */}
            {label && <label htmlFor={name}>{label}</label>}
            <div className={"formInput " + (error ? "withError" : "")}>
                {/* Icono de prefijo */}
                {iconPrefix && (
                    <Icon name={iconPrefix} className={"prefixIcon"} />
                )}
                {/* Campo de entrada */}
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={inputChanged}
                />
            </div>
            {/* Mensaje de error */}
            {error && <p className="errorMsg">{error}</p>}
        </div>
    );
}
