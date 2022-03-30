import {useState} from 'react'
import Axios from 'axios'
import NavContent from '../Navbar/NavContent'

import './PostItem.css'

function PostItem() {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')

    return (
        <>
            <NavContent/>
            <h1 className="post-item-h1">Post an Item to sell</h1>
               
                <form className="item-form">
                <div className="item-selectors">
                    <select name="category" className="dropdown" onChange={(e)=> setCategory(e.target.value)}>
                        <option value="none">Select item category</option>
                        <option value="electronics">electronics</option>
                        <option value="jewelery">jewelery</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="women's clothing">women's clothing</option>
                    </select>
                    <select name='condition' className='dropdown' onChange={(e)=> setCondition(e.target.value)}>
                        <option value="none">Select item condition</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Like new">Like new</option>
                    </select>
                </div>
                    <input type="text" placeholder="Item name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    
                </form>
            
        </>
    )
}

export default PostItem