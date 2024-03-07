import React from 'react'
import logoImage from '../../img/Logo.png';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';


const Header = ({ account, changeAccount }) => {

    return (
        <div className="header">
            <div className="container">
                <div className="header__content">
                    <div className="left__content">
                        <RouterLink className="logo" to='/'>
                                <img src={logoImage} alt="error" />
                        </RouterLink>
                    </div>
                    <div className="right__content">

                        <RouterLink className="btn" to='/users'>
                            Users
                        </RouterLink>

                        {account
                            ?
                            <div className='right__content'>
                                <div className="account__name">{account}</div>
                                <button className="btn"
                                    onClick={() => changeAccount('')}
                                >Exit</button>
                            </div>
                            :
                            <Link to="register" smooth={true} duration={500}><button className="btn">Sign up</button></Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    )

}


export default Header