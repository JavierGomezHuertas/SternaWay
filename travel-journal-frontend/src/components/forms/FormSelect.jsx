import "./FormStyles.css";
// Función que renderiza un select en un formulario
export function FormSelect({ className, name, label, onChange, options }) {
    // Función que se ejecuta al cambiar el valor del select
    function inputChanged(evt) {
        if (onChange) {
            onChange(evt.target.value);
        }
    }
    return (
        // Contenedor del input
        <div className={"inputContainer " + className}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                className="formSelect"
                onChange={inputChanged}
            >
                {/* Mapeamos las opciones del select */}
                {options.map((option, i) => {
                    return (
                        <option key={i} value={option.value}>
                            {/* Si la opción tiene una etiqueta la usamos, si no, usamos el valor */}
                            {option.label ?? option.value}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
