import {useState} from 'react'
import Axios from 'axios'
import NavContent from '../Navbar/NavContent'

import './PostItem.css'

function PostItem() {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [price, setPrice] = useState('')


    function onFileChange(e){
       const reader = new FileReader();
       if(e.target.files[0]) {
           reader.readAsDataURL(e.target.files[0]);
       }
       reader.onload = (readerEvent) => {
           setImageUrl(readerEvent.target.result)
       }
    }

    function addItem(e){
        e.preventDefault()
        let priceInt = parseInt(price)
        if(name && category && condition && description && imageUrl && Number.isInteger(priceInt)){
            let data = {
                category_name: category, 
                name: name,
                condition: condition, 
                description: description,
                image: imageUrl,
                price: priceInt
            }
            fetch('items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(r=> r.json())
            .then(data => {
                console.log(data)
                setCategory('')
                setName('')
                setCondition('')
                setDescription('')
                setImageUrl('')
                setPrice('')
            })
        }else if(Number.isInteger(priceInt) !== true){
            alert(' Price must be a number')
        }else{
            alert('Please fill out all input areas.')
        }
       
    }

    return (
        <>
            <NavContent/>
            <h1 className="post-item-h1">Post an Item to sell</h1>
               
                <form className="item-form">
                <div className="item-selectors">
                    <select name="category" className="dropdown-form" onChange={(e)=> setCategory(e.target.value)}>
                        <option value="">Select item category</option>
                        <option value="electronics">electronics</option>
                        <option value="jewelery">jewelery</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="women's clothing">women's clothing</option>
                    </select>
                    <select name='condition' className='dropdown-form' onChange={(e)=> setCondition(e.target.value)}>
                        <option value="">Select item condition</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Like new">Like new</option>
                    </select>
                </div>
                    <input className="form-input top-input" type="text" placeholder="Item name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <input className="form-input top-input" type="text" placeholder="Item price" value={price} onChange={(e)=>setPrice(e.target.value)}></input>

                    <p className="form-image"> Select item image</p>
                    <input type="file" className="form-input-file" onChange={onFileChange}></input>
                    <textarea className="form-description" rows='6' cols='50' placeholder="Write product description here...." value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                    <button className="item-form-bttn" type="submit" onClick={addItem} >Add Item to Sell</button>
                </form>
            
        </>
    )
}

export default PostItem