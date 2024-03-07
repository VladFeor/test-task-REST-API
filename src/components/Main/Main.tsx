import React from 'react'
import { Link } from 'react-scroll'


const Main = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="center__block">
                    <div className="main__content">
                        <div className="title">Test assignment for front-end developer</div>
                        <div className="subtitle">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</div>
                        <Link to="register" smooth={true} duration={500}><button className="btn">Sign up</button></Link>
                    </div>

                </div>
            </div>
        </div>

    )
}


export default Main