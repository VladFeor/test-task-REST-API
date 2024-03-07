import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import UserList from "../UserList/UserList";
import RegisterUser from "../RegisterUser/RegisterUser";
import axios from "axios";


const MainPage = (props) => {
    const [usersList, setUsersList] = useState([]);

    const fetchDataUsers = async () => {
        try {
            const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6');
            setUsersList(response.data.users);
        } catch (error) {
            console.error('Помилка отримання даних:', error);
        }
    };

    useEffect(() => {
        fetchDataUsers();
    }, []);
    return (
        <div className="App">
            <Main />
            <UserList
                usersList={usersList}
            />
            <RegisterUser
                changeAccount={props.changeAccount}
                fetchDataUsers={fetchDataUsers}
                account={props.account}
            />
        </div>
    );
}

export default MainPage;
