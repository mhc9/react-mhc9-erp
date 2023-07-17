import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import ItemForm from './Form'
import { getItem, resetSuccess } from '../../features/item/itemSlice'

const EditItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { item, isSuccess } = useSelector(state => state.item);

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccess());

            navigate('/item');
        }
    }, [isSuccess]);

    useEffect(() => {
        dispatch(getItem({ id }));
    }, [dispatch, id])

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/item">รายการสินค้า-บริการ</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขสินค้า-บริการใหม่</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขสินค้า/บริการใหม่ ID : {id}</h2>

                <div className="my-2 border p-4 rounded-md">
                    <ItemForm item={item} />
                </div>
            </div>
        </div>
    )
}

    export default EditItem
