import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import api from '../../api'

const EquipmentList = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const fetchEquipments = async () => {
        try {
            const res = await api.get('/api/auth/me');
            
            setLoggedInUser(res.data)
        } catch (error) {
            
        }
    }

    // useEffect(() => {
    //     fetchEquipments();

    //     return () => fetchEquipments();
    // }, []);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">บริการ</Breadcrumb.Item>
                <Breadcrumb.Item active>สถานะการซ่อม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">สถานะการซ่อม</h2>

            </div>
        </div>
    )
}

export default EquipmentList
