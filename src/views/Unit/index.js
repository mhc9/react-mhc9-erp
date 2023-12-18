import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUnits } from '../../features/slices/unit/unitSlice'
import UnitList from './List'
import UnitForm from './Form'

const Unit = () => {
    const dispatch = useDispatch();
    const { units, pager } = useSelector(state => state.unit);
    const [unit, setUnit] = useState(null);
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getUnits({ url: `/api/units` }));
        } else {
            dispatch(getUnits({ url: apiEndpoint }));
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
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>หน่วยนับ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">หน่วยนับ</h2>
                </div>

                <UnitForm
                    unit={unit}
                    onCancel={() => setUnit(null)}
                    onSuccess={() => setApiEndpoint('')}
                />

                <UnitList
                    units={units}
                    pager={pager}
                    onEditting={(unit) => setUnit(unit)}
                    onPageClick={handlePageClick}
                    onDeleted={() => setApiEndpoint('')}
                />
            </div>
        </div>
    )
}

export default Unit
