
import React, { useEffect } from "react";
import image from '../media/pngwing.com (1).png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../pages/utility";

export default function Navbar(props) {

    const navigate = useNavigate();
    const { setUser, setLoggedIn, userInfo } = props;
    const [userId, setUserId] = useState(null)
    const [userSearch, setUserSearch] = useState(true);
    const [forumSearch, setForumSearch] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState(null);
    const [searchList, setSearchList] = useState(null);
    // const [seeSearch, setSeeSearch] = useState(false);

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
            console.log(userInfo)
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

    useEffect(() => {
        const handleSearch = async() => {
            if (userSearch) {
                try {
                    const response = await api.get(`users/search_users/${searchCriteria}`)
                    console.log(response);
                    setSearchList(response.data)
                } catch(error) {
                    console.log(error)
                }
            } else if (forumSearch) {
                try {
                    const response = await api.get(`forum/${searchCriteria}`)
                    console.log(response);
                    setSearchList(response.data)
                } catch(error) {
                    console.log(error)
                }
            };
        };
        handleSearch();
    }, [searchCriteria])

    const handleUserSearch = (id) => {
        setSearchCriteria("");
        setSearchList(null);
        navigate(`/user/${id}`);
    }

    const handleForumSearch = (id) => {
        setSearchCriteria("");
        setSearchCriteria(null);
        setSearchList(null);
        navigate(`/forum/${id}`)
    }
    
    return (
        <nav className="pl-3 pr-3 flex flex-row justify-between items-center bg-color_palette_2">
            <div className="p-1 hover:bg-color_palette_1 rounded"><Link to="/">Home</Link></div>
            <div className="p-1 hover:bg-color_palette_1 rounded"><Link to="/about">About</Link></div>
            <div className="p-1 hover:bg-color_palette_1 rounded"><Link to='/message'>Inbox</Link></div>
            <div className="flex flex-row">
                <div className="mr-1 overflow-hidden flex flex-nowrap h-full">
                    <button onClick={handleUserSearchToggle}  className={`h-full overflow-hidden text-xs md:text-auto p-1 mr-1 rounded ${userSearch ? 'bg-[grey]' : 'bg-[white]'}`}>User</button>
                    <button onClick={handleForumSearchToggle}  className={`h-full text-xs md:text-auto overflow-hidden p-1 rounded ${forumSearch ? 'bg-[grey]' : 'bg-[white]'}`}>Forum</button>
                </div>
                <div className="relative z-10">
                <input
                    className="w-[12vw] rounded"
                    onChange={(e) => setSearchCriteria(e.target.value)}
                    value={searchCriteria}
                    type="text"
                    placeholder="Search"
                />
                    {searchList && 
                    <ul className="absolute bottom--1 left-0 w-[12vw] max-h-[30vh] overflow-scroll">
                        {searchList.map((result) => 
                            (<li
                                onClick={() => {     
                                    if (userSearch) {
                                        handleUserSearch(result.id);
                                    } else if (forumSearch) {
                                        handleForumSearch(result.id);
                                    }
                                }}
                                className="bg-[white] border border-[black]"
                                key={result.id}
                            >
                                {result.title ? result.title : result.display_name}
                            </li>)
                        )}
                    </ul> }
                </div>
            </div>
            <div className="p-1">
                <Link to={`/user/${userId}`}>{userInfo && <img className="rounded-full h-full w-[3vw]" src={userInfo.data.profile_picture} alt="spongebob" />}</Link>

                
            </div>
            <div className="p-1 hover:bg-color_palette_1 rounded">
            <button onClick={handleLogOut}>Logout</button>
            </div>
            
        </nav>
    )
}