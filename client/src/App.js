import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { UserProvider } from './context/UserContext';
import { MediasProvider } from './context/MediaContext';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <main>
      <UserProvider>
        <MediasProvider>
          <NavBar />
          <h1>Welcome!</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </MediasProvider>
      </UserProvider>
    </main>
  );
}

export default App;
