import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getBudgets } from '../../features/slices/budget/budgetSlice'

const BudgetList = () => {
    const dispatch = useDispatch();
    const { budgets, pager, isLoading } = useSelector(state => state.budget);
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getBudgets({ url: `/api/budgets/search?page=` }));
        } else {
            dispatch(getBudgets({ url: apiEndpoint }));
        }
    }, []);

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการงบประมาณ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการงบประมาณ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มรายการ</Link>
                </div>

                <div>
                    <table className="table table-bordered text-sm mb-2">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th>รายการ</th>
                                <th className="text-center w-[18%]">รหัส New GFMIS</th>
                                <th className="text-center w-[18%]">รหัสกิจกรรมหลัก</th>
                                <th className="text-center w-[6%]">สถานะ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading && budgets?.map((budget, index) => (
                                <tr className="font-thin" key={budget.id}>
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td>
                                        <p className="font-bold">{budget.name}</p>
                                        <p>{budget.project?.name}</p>
                                        <p className="badge rounded-pill bg-primary">{budget.project?.plan?.name}</p>
                                    </td>
                                    <td className="text-center">{budget.gfmis_id}</td>
                                    <td className="text-center">{budget.main_gfmis_id}</td>
                                    <td className="text-center">{budget.status}</td>
                                    <td className="text-center p-1">
                                        <Link to={`/budget/${budget.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/budget/${budget.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(budget.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BudgetList