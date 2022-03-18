import React from "react";
import './Searchbar.css'


function Searchbar(){
    return(
        <div className="nav">
                <span className="searchbar-holder">
                <input className="search" type="text" placeholder="search" size="50"></input>
                <button className='search-bttn' > Search</button>
                </span>
            </div>
    )

}

export default Searchbar

