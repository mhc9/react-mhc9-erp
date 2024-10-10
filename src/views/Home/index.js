import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { FaInfoCircle } from 'react-icons/fa'
import { Breadcrumb } from 'react-bootstrap'
import { useGetSystemInfoQuery } from '../../features/services/system/systemApi'
import Loading from '../../components/Loading'

const Home = () => {
    const [cookies, setCookie] = useCookies(['budgetYear']);
    const { data: system, isLoading } = useGetSystemInfoQuery();

    useEffect(() => {
        system && setCookie('budgetYear', system.year);
    }, [system]);

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
                    {isLoading && <Loading />}
                    <h1 className="font-bold text-2xl">Welcome to MHC9 ERP System {!isLoading && <span>ปีงบประมาณ {cookies.budgetYear + 543}</span>}</h1>
                </div>
            </div>

            {/* content */}
            <div className="content min-h-[70vh] mt-3 border rounded-md p-2">
                <h2 className="text-xl">รายงาน</h2>

                <div>
                    {/* // content here... */}
                </div>
            </div>
        </div>
    )
}

export default Home