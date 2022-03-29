import {useState, useEffect} from 'react'

import NavContent from '../Navbar/NavContent'
import FeedCard from './FeedCard'

import './Feed.css'
function Feed(){
    const [feed, setFeed] = useState([])
    
    useEffect(()=> {
        fetch('user_feed')
        .then(r => r.json())
        .then(data => setFeed(data))
    })


    return(
        <>  
            <NavContent/>
            <h1 className="feed-h1">Your Feed</h1>
            <div className="feed-container">
                {feed.map(item => <FeedCard key={item.id} item={item}/>)}
            </div>
        </>
    )
}
export default Feed