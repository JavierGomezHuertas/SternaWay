import "./FormStyles.css";
import { Icon } from "../icons/Icon.jsx";
// Componente de entrada de formulario
export function FormEdit({
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
                    onChange={onChange}
                />
            </div>
            {/* Mensaje de error */}
            {error && <p className="errorMsg">{error}</p>}
        </div>
    );
}
