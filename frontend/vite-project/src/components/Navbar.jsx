
import React from "react";
import image from '../media/pngwing.com (1).png'


export default function Navbar() {
    return (
        <nav className="flex flex-row justify-between">
            <div>About</div>
            <div>Inbox</div>
            <div>
                <input type="text" placeholder="Search" />
                <button className="ml-2">Submit</button>
            </div>
            <div>
                <img className="rounded-full h-full w-[3vw]" src={image} alt="spongebob" />
            </div>
        </nav>
    )
}