import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../../../features/asset/assetSlice';
import Loading from '../../Loading';
import Pagination from '../../Pagination';

const ModalAssetList = ({ isShow, handleHide, handleSelect }) => {
    const dispatch = useDispatch();
    const { assets, pager, loading } = useSelector(state => state.asset);
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getAssets({ url: '/api/assets/search' }));
        } else {
            dispatch(getAssets({ url: apiEndpoint }));
        }
    }, [apiEndpoint]);

    const handlePageClick = (url) => {
        /** ============== Generate query string param list ============== */
        // query string param list here
        const queryStr = '';
        /** ============================ */

        setApiEndpoint(`${url}${queryStr}`);
    };

    return (
        <Modal
            show={isShow}
            onHide={handleHide}
            size='xl'
        >
            <Modal.Header className="py-1" closeButton>
                <Modal.Title>รายการพัสดุ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className="table table-bordered text-sm mb-0">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เลขที่พัสดุ</th>
                                <th>รายการพัสดุ</th>
                                <th className="text-center w-[10%]">เลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {assets && assets.map((asset, index) => (
                                <tr key={asset.id} className="font-thin">
                                    <td className="text-center">{index+pager.from}</td>
                                    <td className="text-center">{asset.asset_no}</td>
                                    <td>
                                        <p className="text-gray-400 text-sm">{asset.group?.category?.name}</p>
                                        <p>{asset.name}</p>
                                        <span className="font-bold ml-1">ยี่ห้อ: </span>{asset.brand.name} 
                                        <span className="font-bold ml-1">รุ่น: </span>{asset.model ? asset.model : '-'}
                                        <span className="font-bold ml-1">ซื้อเมื่อปี: </span>{asset.first_year ? asset.first_year : '-'}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                handleHide();
                                                handleSelect(asset);
                                            }}
                                        >
                                            เลือก
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer className="py-1">
                <Pagination
                    pager={pager}
                    onPageClick={handlePageClick}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAssetList
