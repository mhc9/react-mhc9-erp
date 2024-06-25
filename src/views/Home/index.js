import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { Breadcrumb } from 'react-bootstrap'
import { useGetUserDetailsQuery } from '../../features/services/auth/authApi'

const Home = () => {
    const { data: user } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000,
        refetchOnMountOrArgChange: true,
    });

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <div className="flex items-center gap-3 border border-green-900 bg-green-300 rounded-md p-4 text-green-800">
                <FaInfoCircle size={'50px'} />
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl">Welcome to IT Helpdesk System</h1>
                    <p className="">
                        {user && user.name}
                    </p>
                </div>
            </div>

            {/* content */}
            <div className="content min-h-[70vh] mt-3 border rounded-md p-2">
                <h2 className="text-xl">สถิติการแจ้งซ่อม</h2>

                <div>
                    {/* // content here... */}
                </div>
            </div>
        </div>
    )
}

export default Home