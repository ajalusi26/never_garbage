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
            if(data.username){
                navigate('/main-page')
                console.log(data)
            }else{
                setLoaded(true)
               console.log(data)
            }
        })
    }, [])
    
    function bg(){
        let x = 1;
        while (x <= 12){
            let square = document.createElement('li')

            square.style.left = `${x * 5}%`
            square.style.width = `${x * 20}px`
            square.style.height = `${x * 20}px`
            square.style.animationDelay = `${x * 1}s`
            square.style.animationDuration = `${x * 2.5}s`


            document.querySelector('.bg-bubbles').appendChild(square)
            x++
        }
    }

    if (loaded){
        return(
           <>

            <div className="wrapper">
            <div className="login-container">
                <h2 >Sign in</h2>
                <form >
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <br></br>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button type="submit" className='button-login'>Login</button>
                    <br></br>
                    <Link to={"/create-account"} className="create-account">Dont have an account? Click here to create one!</Link>

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