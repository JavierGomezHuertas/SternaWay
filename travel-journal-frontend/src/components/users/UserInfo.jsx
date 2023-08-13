import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/get-user-info";
import { PageSubtitle2 } from "../utils/PageSubtitle2.jsx";
import { TotalPosts } from "./TotalPosts";
import { TotalLikes } from "./TotalLikes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

export function UserInfo({ userId }) {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const [user] = await getUserInfo(userId);
                setUserInfo(user);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }

        fetchUserInfo();
    }, [userId]);

    if (!userInfo) {
        return <div>Loading user info...</div>;
    }

    // Formatear la fecha de nacimiento
    dayjs.extend(relativeTime);
    const birthDate = dayjs(userInfo.birthDate).format("D MMMM YYYY");

    return (
        <article className="userPerfil">
            <div className="userImage">
                <img
                    src={
                        userInfo.avatarURL ||
                        `https://ui-avatars.com/api/?name=${userInfo.name}&background=0D8ABC&color=fff`
                    }
                    alt={`Avatar of ${userInfo.name}`}
                />
                <p>Hello, I&apos;m {userInfo.name}</p>
            </div>
            <article className="userInfo">
                {userId ? <TotalPosts userId={userId} /> : <TotalPosts />}
                {userId ? <TotalLikes userId={userId} /> : <TotalLikes />}
                <PageSubtitle2>About me</PageSubtitle2>
                <p>From: {userInfo.country}</p>
                <p>{birthDate}</p>
            </article>
        </article>
    );
}
