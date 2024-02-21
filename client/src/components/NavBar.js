import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
    const { user, logout } = useContext(UserContext)
    
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => {
            logout()
        })
        }

    return (
        <nav>
            <div>
                <NavLink to="/" className="nav-link">Home</NavLink> 
                {user ? (
                    <>
                        <p className="greeting">You are logged in as: {user.username}</p>
                        <button className="logoutButton" onClick={handleLogout}>Logout</button>
                        {/* <NavLink to="/create" className="nav-link">Create New Media</NavLink> */}
                        {/* <NavLink to={`/user_reviews/${user.id}`} className="nav-link">My Reviews</NavLink> */}
                    </>
                ) : (
                    <>
                        <NavLink to="/signup" className="nav-link">Signup</NavLink>
                        <NavLink to="/login" className="nav-link">Login</NavLink> 
                    </>
                    
                )} 
                
                {/* <NavLink to="/search_media" className="nav-link">Search for Media</NavLink> */}
            </div>
        </nav>
    )
}


export default NavBar