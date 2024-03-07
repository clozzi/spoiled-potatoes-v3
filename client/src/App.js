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
import SearchMedia from './components/SearchMedia';
import MyReviews from './components/MyReviews';
import ErrorPage from './components/ErrorPage';


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
            <Route path="/medias/new" element={<CreateMedia />} />
            <Route path="/search_media" element={<SearchMedia />} />
            <Route path="/my_reviews" element={<MyReviews />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MediasProvider>
      </UserProvider>
    </main>
  );
}


export default App;