import { useState } from "react";
import { sendEditPost } from "../../api/send-edit-post";
import { useNavigate } from "react-router-dom";
import { uploadPostPhotos } from "../../api/upload-post-photos";
import { deleteImageOnServer } from "../../api/delete-post-photos";
import { getPostDetail } from "../../api/get-post-detail";
import { PageSubtitle } from "../utils/PageSubtitle";
import { FormSelect } from "../forms/FormSelect";
import countryData from "../../example-data/countries.json";

const host = import.meta.env.VITE_API_HOST;
const countryNames = countryData
    .map((c) => ({
        value: c.name.nativeName.spa?.common ?? c.name.common,
    }))
    .sort((a, b) => {
        return a.value.localeCompare(b.value); /// (-1, +1)
    });

export function PostEditor({ post }) {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [images, setImages] = useState([...post.photos]);
    const [place, setPlace] = useState(post.place);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const navigate = useNavigate();
    const handlePlaceChange = (value) => setPlace(value);
    const handleUploadImage = async (e) => {
        const newImage = e.target.files[0];

        try {
            await uploadPostPhotos(post.id, [newImage]);

            setTimeout(async () => {
                try {
                    const updatedPost = await getPostDetail(post.id);
                    setImages(updatedPost.photos);
                } catch (error) {
                    console.error("Error getting post details:", error);
                }
            }, 300);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleDeleteImage = async (deletedId) => {
        try {
            await deleteImageOnServer(post.id, deletedId);
            setImages(images.filter((x) => x.id !== deletedId));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleSave = async () => {
        const newImages = images.filter((x) => x.isNew);

        try {
            await Promise.all([
                uploadPostPhotos(post.id, newImages),
                sendEditPost(post.id, post.userId, {
                    title,
                    description,
                    place,
                }),
            ]);

            navigate(-1);
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    return (
        <div className="editpage">
            <PageSubtitle>Edit Your Post</PageSubtitle>
            <div className="inputContainer">
                <label htmlFor=""></label>
                <input
                    className="editTitle"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="inputContainer">
                <textarea
                    className="editDescription"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div className="button">
                <input
                    className="editImage"
                    type="file"
                    onChange={handleUploadImage}
                />
            </div>
            <div className="editImage">
                {Array.isArray(images) &&
                    images.map((image) => (
                        <div className="editImageList" key={image.id}>
                            <img
                                src={
                                    image.imageURL.startsWith("http")
                                        ? image.imageURL
                                        : `${host}${image.imageURL}`
                                }
                                alt="Post"
                            />
                            <button onClick={() => handleDeleteImage(image.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
            <FormSelect
                label="Place"
                options={countryNames}
                value={place}
                onChange={handlePlaceChange}
            />
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
}
