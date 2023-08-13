import { Button } from "./Button.jsx";
import { useRef, useState } from "react";
import "./FormStyles.css";
import { Icon } from "../icons/Icon.jsx";

//URL.createObjectURL(evt.target.files[0]) = URL
export function FormImage({ className, name, label, onChange }) {
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const MAX_IMAGES = 6;

    function inputChanged(evt) {
        const newFiles = [...files, evt.target.files[0]];
        setFiles(newFiles);
        onChange(newFiles);
    }

    function selectNewImage() {
        inputRef.current.click();
    }

    const isAddButtonDisabled = files.length >= MAX_IMAGES;

    return (
        <div className={"inputContainer " + className}>
            <label htmlFor={name}>{label}</label>
            <div className="formInput formImage">
                <ul className="formImageList">
                    {files.map((file, i) => {
                        return (
                            <li key={i}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                />
                            </li>
                        );
                    })}
                </ul>
                <Button
                    onClick={selectNewImage}
                    className={"center large"}
                    disabled={isAddButtonDisabled}
                >
                    <Icon name={"Add_Circle"} />
                </Button>
            </div>
            <input
                ref={inputRef}
                id={name}
                type="file"
                name={name}
                className="formImageInput"
                onChange={inputChanged}
                accept="image/*"
            />
        </div>
    );
}