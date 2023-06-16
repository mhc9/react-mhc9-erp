import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getOwnershipsByAsset } from '../../../features/asset-ownership/assetOwnershipSlice'
import moment from 'moment'

const OwnershipList = ({ assetId }) => {
    const dispatch = useDispatch();
    const { ownerships, pager, loading } = useSelector(state => state.ownership);

    useEffect(() => {
        if (assetId) dispatch(getOwnershipsByAsset({ assetId }));
    },[assetId]);


    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center">#</th>
                        <th className="w-[20%] text-center">วันที่รับ</th>
                        <th>ผู้ดูแล</th>
                        <th className="w-[15%] text-center">สถานะ</th>
                        <th className="w-[10%] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ownerships && ownerships.map((owns, index) => (
                        <tr key={owns.id}>
                            <td className="text-center">{index+pager.from}</td>
                            <td className="text-center">{moment(owns.owned_at).format('DD/MM/YYYY')}</td>
                            <td>{owns.owner.firstname} {owns.owner.lastname}</td>
                            <td className="text-center">
                                {owns.status}
                            </td>
                            <td className="text-center">
                                <Link to={`/asset//edit`} className="btn btn-sm btn-warning mr-1">
                                    <FaPencilAlt />
                                </Link>
                                <button className="btn btn-sm btn-danger">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OwnershipList
