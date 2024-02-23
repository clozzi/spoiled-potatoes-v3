import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { UserProvider } from './context/UserContext';
import { MediasProvider } from './context/MediasContext';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Media from './components/Media';
import CreateMedia from './components/CreateMedia';

function App() {
  return (
    <main>
      <UserProvider>
        <MediasProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/medias/:id" element={<Media />} />
            <Route path="/create" element={<CreateMedia />} />
          </Routes>
        </MediasProvider>
      </UserProvider>
    </main>
  );
}

export default App;
