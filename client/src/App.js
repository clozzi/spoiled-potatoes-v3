import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <main>
      <UserProvider>
        {/* <NavBar /> */}
        <h1>Welcome!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UserProvider>
    </main>
  );
}

export default App;
