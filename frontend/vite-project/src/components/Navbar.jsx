
import React, { useEffect } from "react";
import image from '../media/pngwing.com (1).png'
import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar(props) {

    const navigate = useNavigate();
    const { setUser, setLoggedIn, userInfo } = props;
    const [userId, setUserId] = useState(null)

    const handleLogOut = () => {
        localStorage.removeItem("token")
        setUser(null)
        setLoggedIn(false)
        navigate('/register')
    }

    
    useEffect(() => {
        if (userInfo) {
            const getUserId = () => {
                setUserId(userInfo.data.id);
            }
            getUserId()
        }
    }, [userInfo])


    return (
        <nav className="flex flex-row justify-between items-center bg-color_palette_2">
            <div className="pl-3"><Link to="/about">About</Link></div>
            <div><Link to='/message'>Inbox</Link></div>
            <div>
                <input type="text" placeholder="Search" />
                <button className="ml-2 pl-1 pr-1 border rounded bg-color_palette_3">Submit</button>
            </div>
            <div className="pr-3">
                <Link to={`/user/${userId}`}><img className="rounded-full h-full w-[3vw]" src={image} alt="spongebob" /></Link>

                
            </div>
            <div>
            <button onClick={handleLogOut}>Logout</button>
            </div>
            
        </nav>
    )
}