import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getDivisions } from '../../features/division/divisionSlice'
import DivisionList from './List'
import DivisionForm from './Form'

const Division = () => {
    const dispatch = useDispatch();
    const { divisions, pager } = useSelector(state => state.division);
    const [division, setDivision] = useState(null);
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getDivisions());
        } else {
            dispatch(getDivisions());
        }
    }, [dispatch, apiEndpoint]);

    const handlePageClick = (url) => {
        setApiEndpoint(url);
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>งาน</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">งาน</h2>
                </div>

                <DivisionForm
                    division={division}
                    handleCancel={() => setDivision(null)}
                />

                <DivisionList
                    divisions={divisions}
                    pager={pager}
                    onEditting={(dep) => setDivision(dep)}
                    onPageClick={handlePageClick}
                />
            </div>
        </div>
    )
}

export default Division
