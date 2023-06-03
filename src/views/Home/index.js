import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import api from '../../api'

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const fetchEquipments = async () => {
        try {
            const res = await api.get('/api/auth/me');
            
            setLoggedInUser(res.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchEquipments();

        return () => fetchEquipments();
    }, []);

    return (
        <div>
            <div className="flex items-center gap-3 border border-green-900 bg-green-300 rounded-md p-4 text-green-800">
                <FaInfoCircle size={'50px'} />
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl">Welcome to IT Helpdesk System</h1>
                    <p className="">
                        {loggedInUser && loggedInUser.name}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home