import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <main>
      {/* <NavBar /> */}
      <h1>Welcome!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
