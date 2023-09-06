
import React, { useEffect } from "react";
import image from '../media/pngwing.com (1).png'
import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar(props) {

    const navigate = useNavigate();
    const { setUser, setLoggedIn, userInfo } = props;
    const [userId, setUserId] = useState(null)
    const [userSearch, setUserSearch] = useState(true);
    const [forumSearch, setForumSearch] = useState(false);

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

    const handleUserSearchToggle = () => {
        setUserSearch(true);
        setForumSearch(false);
    };

    const handleForumSearchToggle = () => {
        setUserSearch(false);
        setForumSearch(true);
    };

    return (
        <nav className="pl-3 pr-3 flex flex-row justify-between items-center bg-color_palette_2">
            <div className="p-1 hover:bg-color_palette_1 rounded"><Link to="/">Home</Link></div>
            <div className="p-1 hover:bg-color_palette_1 rounded"><Link to="/about">About</Link></div>
            <div className="p-1 hover:bg-color_palette_1 rounded"><Link to='/message'>Inbox</Link></div>
            <div className="flex flex-row">
                <div className="mr-1 overflow-hidden flex flex-nowrap">
                    <button onClick={handleUserSearchToggle}  className={`h-3 md:h-auto overflow-hidden text-xs md:text-auto p-1 mr-1 rounded ${userSearch ? 'bg-[grey]' : 'bg-[white]'}`}>User</button>
                    <button onClick={handleForumSearchToggle}  className={`h-3 md:h-auto text-xs md:text-auto overflow-hidden p-1 rounded ${forumSearch ? 'bg-[grey]' : 'bg-[white]'}`}>Forum</button>
                </div>
                <input type="text" placeholder="Search" />
                <button className="ml-2 pl-1 pr-1 border rounded bg-color_palette_3">Submit</button>
            </div>
            <div className="p-1">
                <Link to={`/user/${userId}`}><img className="rounded-full h-full w-[3vw]" src={image} alt="spongebob" /></Link>

                
            </div>
            <div className="p-1 hover:bg-color_palette_1 rounded">
            <button onClick={handleLogOut}>Logout</button>
            </div>
            
        </nav>
    )
}