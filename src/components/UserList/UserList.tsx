import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserItem from '../UserItem/UserItem';
import { Link } from 'react-router-dom';


const UserList = ({ usersList }) => {
    return (
        <div className="container">
            <div className="list__users">
                <div className="main__title">Working with GET request</div>
                <div className="list__content">

                    {(usersList && usersList.length !== 0)
                        ?
                        usersList.map((item) => {
                            return <UserItem item={item} />
                        })
                        :
                        <div>No users available</div>
                    }
                </div>
                {(usersList && usersList.length !== 0) && <Link className="btn" to='/users'>Show more</Link>}
            </div>
        </div>

    )
}


export default UserList

