import {itemAdded} from '../../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

function ItemContainer(){
    const items = useSelector((state)=> state.items.items)
    const user = useSelector((state)=> state.items.current_user)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/items')
        .then(r => r.json())
        .then(data => dispatch(itemAdded(data)))
      }, [dispatch]);

    return(
        <div>
            {console.log("items",items)}
            {console.log('user', user)}
        </div>
    )
}

export default ItemContainer