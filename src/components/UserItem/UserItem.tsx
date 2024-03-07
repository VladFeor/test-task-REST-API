import React from 'react'


const UserItem = ({item}) => {

    return (
        <div className="user__item">
            <img className='user__photo' src={item.photo} alt="" />
            <div className="user__name">{item.name}</div>
            <div className="user__info">{item.position}</div>
            <div className="user__info">{item.email}</div>
            <div className="user__info">{item.phone}</div>
        </div>
    )
}


export default UserItem