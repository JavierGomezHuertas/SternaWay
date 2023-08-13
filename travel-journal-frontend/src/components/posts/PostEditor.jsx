import { useState } from "react";
import { sendEditPost } from "../../api/send-edit-post";
import { useNavigate } from "react-router-dom";
import { uploadPostPhotos } from "../../api/upload-post-photos";
import { deleteImageOnServer } from "../../api/delete-post-photos";
import { getPostDetail } from "../../api/get-post-detail";

const host = import.meta.env.VITE_API_HOST;

export function PostEditor({ post }) {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [images, setImages] = useState([...post.photos]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const navigate = useNavigate();

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
                sendEditPost(post.id, {
                    title,
                    description,
                }),
            ]);

            navigate(-1);
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    return (
        <div>
            <input value={title} onChange={handleTitleChange} />
            <textarea value={description} onChange={handleDescriptionChange} />
            <input type="file" onChange={handleUploadImage} />
            {Array.isArray(images) &&
                images.map((image) => (
                    <div key={image.id}>
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

            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
}
