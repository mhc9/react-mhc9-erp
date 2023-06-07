import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../../features/asset/assetSlice';
import Loading from '../Loading';

const ModalAssetList = ({ isShow, handleHide, handleSelect }) => {
    const dispatch = useDispatch();
    const { assets, pager, loading } = useSelector(state => state.asset);

    useEffect(() => {
        dispatch(getAssets());
    }, [dispatch]);

    return (
        <Modal
            show={isShow}
            onHide={handleHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>รายการพัสดุ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className="table table-bordered">
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
                                <tr key={asset.id}>
                                    <td className="text-center">{index+pager.from}</td>
                                    <td className="text-center">{asset.asset_no}</td>
                                    <td>
                                        <p className="text-gray-400 text-sm">{asset.category.name}</p>
                                        <p>{asset.name}</p>
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
        </Modal>
    )
}

export default ModalAssetList
