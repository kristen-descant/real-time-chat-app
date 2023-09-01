
import React from "react";
import image from '../media/pngwing.com (1).png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token")
        setUser(null)
        navigate('/register')
    }

    return (
        <nav className="flex flex-row justify-between items-center bg-color_palette_2">
            <div className="pl-3"><Link to="/about">About</Link></div>
            <div><Link to='/message'>Inbox</Link></div>
            <div>
                <input type="text" placeholder="Search" />
                <button className="ml-2 pl-1 pr-1 border rounded bg-color_palette_3">Submit</button>
            </div>
            <div className="pr-3">
                <Link to='#'><img className="rounded-full h-full w-[3vw]" src={image} alt="spongebob" /></Link>

                
            </div>
            <div>
            <button onClick={handleLogOut}>Logout</button>
            </div>
            
        </nav>
    )
}