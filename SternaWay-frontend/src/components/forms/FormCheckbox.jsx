import "./FormStyles.css";

export function FormCheckbox({ className, name, label, onChange }) {
  function inputChanged(evt) {
    if (onChange) {
      onChange(evt.target.value == "on");
    }
  }

  return (
    <div className={"inputContainer noWrap gap " + className}>
      <input
        id={name}
        type="checkbox"
        name={name}
        onChange={inputChanged}
        className="formInput autoWidth"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
