import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserItem from '../UserItem/UserItem';

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}?page=${currentPage}&count=6`);
            const sortedUsers = response.data.users.sort((a, b) => a.registration_timestamp - b.registration_timestamp);

            setUsers(sortedUsers);

            const { total_pages: fetchedTotalPages } = response.data;

            setTotalPages(fetchedTotalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='container '>
            <div className='pagination'>
                <button
                    className='btn'
                    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{currentPage}</span>
                <button
                    className='btn'
                    onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            <div className="list__content">
                {users.length !== 0 ?
                    users.map((item) => (
                        <UserItem key={item.id} item={item} />
                    ))
                    :
                    <h1>Loading...</h1>
                }
            </div>


        </div>
    );
};
export default UsersPage;
