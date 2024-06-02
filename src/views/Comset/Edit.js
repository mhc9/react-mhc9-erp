import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { getComset } from '../../features/slices/comset/comsetSlice'
import ComsetForm from './Form'

const EditComset = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { comset, isLoading } = useSelector(state => state.comset);

    useEffect(() => {
        if (id) {
            dispatch(getComset(id));
        }
    }, [id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/comset">ชุดคอมพิวเตอร์</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขชุดคอมพิวเตอร์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขชุดคอมพิวเตอร์</h2>

                <div className="my-2 border p-4 rounded-md">
                    <ComsetForm comset={comset} />
                </div>
            </div>
        </div>
    )
}

    export default EditComset
