import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { UserProvider } from './context/UserContext';
import { MediasProvider } from './context/MediaContext';

function App() {
  return (
    <main>
      <UserProvider>
        <MediasProvider>
          {/* <NavBar /> */}
          <h1>Welcome!</h1>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MediasProvider>
      </UserProvider>
    </main>
  );
}

export default App;
