import React, { useEffect } from 'react'
import api from '../../api'

const Home = () => {
    const fetchEquipments = async () => {
        const res = await api.get('/api/equipments');

        console.log(res);
    }

    useEffect(() => {
        fetchEquipments();

        return () => fetchEquipments();
    }, []);

    return (
        <div>Welcome to IT Helpdesk System</div>
    )
}

export default Home