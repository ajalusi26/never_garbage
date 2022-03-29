import {useState, useEffect} from 'react'

import NavContent from '../Navbar/NavContent'
import SavedItemCard from './SavedItemCard'
import './SavedItems.css'

function SavedItems(){
    const [savedItems, setSavedItems] = useState([])
    const [update, setUpdate] = useState(false)
    const [loaded, setLoaded] = useState(false)
    useEffect(()=> {
        fetch('/user_saved_items')
        .then(r => r.json())
        .then(data => setSavedItems(data))
        setLoaded(true)
    }, [update])

    if(loaded){
        return(
            <>  
                <NavContent/>
                <h1 className="saved-items-h1">Your saved items</h1>
                <div className="saved-items-container">
                    {savedItems.map(item => <div>  <SavedItemCard key={item.id} item={item} setUpdate={setUpdate} update={update}/> </div>)}
                </div>
            </>
        )
    }else{
        return(
            <>
                <NavContent/>
                <h1 className="saved-items-h1">Your saved items</h1>
            </>
        )
    }
   
}
export default SavedItems;