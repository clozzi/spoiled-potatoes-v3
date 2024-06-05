import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function NavBar() {
    const { user, logout } = useContext(UserContext)

    let nav = document.querySelector("nav")
        window.onscroll = function() {
            if (document.documentElement.scrollTop > 20) {
                nav.classList.add("sticky")
            } else {
                nav.classList.remove("sticky")
            }
        }

    return (
        <nav>
            <div className="nav-content">
                <div className="logo">
                    <a href="#">Spoiled Potatoes</a>
                </div>
                {user ? (
                    <ul className="nav-links">
                        <li><NavLink to="/" className="nav-link">{user.username}'s Home</NavLink></li>
                        <li><NavLink to="/medias/new" className="nav-link">Create New Media</NavLink></li>
                        <li><NavLink to="/my_reviews" className="nav-link">My Reviews</NavLink></li>
                        <li><NavLink to="/search_media" className="nav-link">Search the Potatobase</NavLink></li> 
                        <li><button className="logoutButton" onClick={logout}>Logout</button></li> 
                    </ul>
                ) : (
                    <ul className="nav-links">
                        <li><NavLink to="/" className="nav-link">Home</NavLink></li> 
                        <li><NavLink to="/signup" className="nav-link">Signup</NavLink></li>
                        <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
                        <li><NavLink to="/search_media" className="nav-link">Search the Potatobase</NavLink></li> 
                    </ul> 
                )} 
            </div>
        </nav>
    )
}


export default NavBar