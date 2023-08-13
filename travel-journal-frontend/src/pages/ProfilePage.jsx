import { useParams } from "react-router-dom";
import { LikedPosts } from "../components/posts/LikedPosts.jsx";
import { CreatedPosts } from "../components/posts/CreatedPosts.jsx";
import { UserInfo } from "../components/users/UserInfo.jsx";
import { useCurrentUser } from "../hooks/use-current-user.js";

export function ProfilePage() {
    const { userId } = useParams();
    const currentUser = useCurrentUser();

    return (
        <section className="container itemsPosts">
            {userId ? (
                <UserInfo userId={userId} />
            ) : (
                <UserInfo userId={currentUser.id} />
            )}
            {userId ? <CreatedPosts userId={userId} /> : <CreatedPosts />}
            {userId ? <LikedPosts userId={userId} /> : <LikedPosts />}
        </section>
    );
}
