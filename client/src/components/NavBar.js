import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function NavBar() {
    const { user, logout } = useContext(UserContext)
    
    function handleLogout() {
        fetch("/api/logout", {
            method: "DELETE",
        })
        logout()
        }

    return (
        <nav>
            <div>
                <NavLink to="/" className="nav-link">Home</NavLink> 
                {user ? (
                    <>
                        <p className="greeting">You are logged in as: {user.username}</p>
                        <button className="logoutButton" onClick={handleLogout}>Logout</button>
                        <NavLink to="/medias/new" className="nav-link">Create New Media</NavLink>
                        <NavLink to="/my_reviews" className="nav-link">My Reviews</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/signup" className="nav-link">Signup</NavLink>
                        <NavLink to="/login" className="nav-link">Login</NavLink> 
                    </> 
                )} 
                <NavLink to="/search_media" className="nav-link">Search the Potatobase</NavLink>
            </div>
        </nav>
    )
}


export default NavBar