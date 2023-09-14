import "./FormStyles.css";
// Componente de formulario para el campo de texto
export function FormTextarea({ className, name, placeholder, onChange }) {
    // Función para manejar el cambio de entrada
    function inputChanged(evt) {
        if (onChange) {
            onChange(evt.target.value);
        }
    }
    // Renderizar el campo de texto en el formulario
    return (
        <div className={"inputContainer " + className}>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={inputChanged}
                className="formInput formTextarea"
            />
        </div>
    );
}
