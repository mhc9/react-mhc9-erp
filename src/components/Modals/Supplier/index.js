import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { getSuppliers } from '../../../features/slices/supplier/supplierSlice';
// import FilteringInputs from '../../Item/FilteringInputs';
// import { useGetInitialFormDataQuery } from '../../../services/item/itemApi';
import { currency, toShortTHDate } from '../../../utils';
import Loading from '../../Loading';
import Pagination from '../../../components/Pagination'

const initialFilters = {
    name: '',
    category: '',
};

const initialFormData = {
    units: [],
    categories: [],
};

const ModalSupplierList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { suppliers, pager, loading } = useSelector(state => state.supplier);
    const [params, setParams] = useState('');
    const [apiEndpoint, setApiEndpoint] = useState('');
    // const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getSuppliers({ url: `/api/suppliers/search?page=&status=0` }));
        } else {
            dispatch(getSuppliers({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handlePageClick = (url) => {
        setApiEndpoint(`${url}&status=0`);
    };

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/suppliers/search?page=&status=0`);
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header className="border py-1 px-2">
                <Modal.Title>รายการผู้จัดจำหน่าย</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={handleFilter}
                    formData={formData}
                /> */}

                {loading && (
                    <div className="text-center">
                        <Loading />
                    </div>
                )}

                {!loading && suppliers && (
                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="w-[20%]">ชื่อผู้จัดจำหน่าย</th>
                                <th>ที่อยู่</th>
                                <th className="w-[20%]">เจ้าของ</th>
                                <th className="text-center w-[6%]">สถานะ</th>
                                <th className="text-center w-[10%]">เลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers && suppliers.map((supplier, index) => (
                                <tr key={supplier.id} className="font-thin">
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td>{supplier.name}</td>
                                    <td className="text-xs">
                                        {supplier.address ? supplier.address+' ' : ''}หมู่.{supplier.moo ? supplier.moo : '-'} ถ.{supplier.raod ? supplier.raod : '-'}
                                        {supplier.tambon?.name} {supplier.amphur?.name} {supplier.changwat?.name} {supplier.zipcode ? supplier.zipcode : '-'}
                                        <span className="ml-1">โทร.{supplier.tel ? supplier.tel : '-'} Fax.{supplier.fax ? supplier.fax : '-'}</span>
                                    </td>
                                    <td>{supplier.owner_name}</td>
                                    <td className="text-center">
                                        {supplier.status === 0 && <i className="fas fa-toggle-off text-danger text-lg"></i>}
                                        {supplier.status === 1 && <i className="fas fa-toggle-on text-primary text-lg"></i>}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm text-sm"
                                            onClick={() => {
                                                onHide();
                                                onSelect(supplier);
                                            }}
                                        >
                                            เลือก
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <Pagination
                    pager={pager}
                    onPageClick={handlePageClick}
                />
            </Modal.Body>
        </Modal>
    )
}

export default ModalSupplierList
