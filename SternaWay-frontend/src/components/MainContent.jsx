import { Route, Routes } from "react-router-dom";
import { AllPostsPage } from "../pages/AllPostsPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { PostDetailPage } from "../pages/PostDetailPage.jsx";
import { ValidateEmail } from "../pages/ValidateEmail.jsx";
import { NewPostPage } from "../pages/NewPostPage.jsx";
import { SearchPage } from "../pages/SearchPage.jsx";
import { PageTitle } from "./utils/PageTitle.jsx";
import { BestPostsPage } from "../pages/BestPostPage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx"
import { PostEditorPage } from "../pages/PostEditorPage.jsx";

export function MainContent() {
  return (
      <main className="mainContainer">
          <PageTitle />
          <Routes>
              <Route path="/" element={<AllPostsPage />} />;
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="/auth/validate-email" element={<ValidateEmail />} />
              <Route path="/bestposts" element={<BestPostsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/posts/edit/:id" element={<PostEditorPage />} />
              <Route path="/user/profile/:userId" element={<ProfilePage />} />
          </Routes>
      </main>
  );
}
