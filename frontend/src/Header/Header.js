import React from 'react'
import './Header.css'
import { Button} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import { auth } from '../Firebase/firebase'


function Header({user, setOpen, setOpenSignIn}) {
    return(
        <div className="header">

            <img className="header__logo" alt="" src={process.env.PUBLIC_URL + "/1200px-Instagram_logo.svg.png"} />
            <div className="signIn_signOut_button">

            <div className="navigation__list">
                <HomeIcon className="home__logo" />
                <ExploreOutlinedIcon />
                {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>): (
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>
                )}
                {!user?(<Button onClick={() => setOpenSignIn(true)} >LogIn</Button>): (
                    <Button onClick={()=> setOpen(true)}>SignUp</Button>
                )}
            </div>
            
            
        </div>
        
        
        </div>
    )
}

export default Header
