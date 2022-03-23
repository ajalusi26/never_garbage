import './Accounts.css'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"

function ResetPassword(){
    const [username, setUsername] = useState("")
 
    const [newPassword, setNewPassword] = useState("")
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/is_logged_in')
        .then(r => r.json())
        .then(data => {
            if(data.name){
                navigate('/main-page')
                console.log(data)
            }else{
                setLoaded(true)
               console.log(data)
            }
        })
    }, [])
    

    function reset(e){
        e.preventDefault()
        let loginData = {
            name: username, 
            newPassword: newPassword
        }
        fetch('/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            })
            .then(response => response.json())
            .then(data => {
            {
                if(data.name){
                    console.log('new user', data)
                   navigate('/main-page')
                }
                else{
                    alert('Wrong username or password')
                }  
             
            }
        })
        setNewPassword('')
        setUsername('')
    }

    if (loaded){
        return(
           <>

            <div className="wrapper">
            <div className="login-container">
                <h2 >Reset Password</h2>
                <form >
                    <input required type="text" placeholder="Username or Email" value={username} onChange={(e)=>setUsername(e.target.value)}  />
                    <br></br>
                    <input required type="password" placeholder="new Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                    <button type="submit" className='button-login' onClick={reset}>RESET</button>
                    <br></br>
                    {/* <Link to={"/create-account"} className="create-account">Dont have an account? Click here to create one!</Link> */}

                </form>
            </div>
            <ul className="bg-bubbles"> </ul>
            </div>
            </>
        )
    }else {return(
        <div className="wrapper"></div>
    )}
}

export default ResetPassword