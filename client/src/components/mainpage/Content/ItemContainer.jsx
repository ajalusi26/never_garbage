import {itemAdded, itemsToDisplay} from '../../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

import ItemCard from './ItemCard'
import './ItemContainer.css'

function ItemContainer(){
    const items = useSelector((state)=> state.items.itemsDisplayed)
    const user = useSelector((state)=> state.items.current_user)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/items')
        .then(r => r.json())
        .then(data => {
            dispatch(itemAdded(data))
            dispatch(itemsToDisplay(data))
        })
      }, [dispatch]);

    return(
        <div className="item-container">
            {items.map(item => <ItemCard key={item.id} item={item}/>)}
        </div>
    )
}

export default ItemContainer