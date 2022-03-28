import './Accounts.css'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
    

    function login(e){
        e.preventDefault()
        let loginData = {
            name: username, 
            password: password
        }
        fetch('/login', {
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
                    console.log(data)
                   localStorage.setItem('current_user', data.id)
                   navigate('/main-page')
                }
                else{
                    console.log(data)
                    alert('Wrong username or password')
                }  
             
            }
        })
        setPassword('')
        setUsername('')
    }

    if (loaded){
        return(
           <>

            <div className="wrapper">
            <div className="login-container">
                <h2 >Sign in</h2>
                <form >
                    <input required type="text" placeholder="Username or Email" value={username} onChange={(e)=>setUsername(e.target.value)}  />
                    <br></br>
                    <input required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button type="submit" className='button-login' onClick={login}>Login</button>
                    <br></br>
                    <Link to={"/create-account"} className="create-account">Dont have an account? Click here to create one!</Link>
                    <br></br>
                    <br></br>
                    <Link to={"/reset-password"} className="create-account">Forgot your password? Click here to reset it!</Link>
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

export default Login