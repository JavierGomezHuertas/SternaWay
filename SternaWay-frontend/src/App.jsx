import { Navbar } from "./components/navbar/Navbar.jsx";
import { MainContent } from "./components/MainContent.jsx";
import { AuthProvider } from "./contexts/auth-context.jsx";

function App() {
  return (
    <AuthProvider>
      <MainContent />
      <Navbar />
    </AuthProvider>
  );
}

export default App;
