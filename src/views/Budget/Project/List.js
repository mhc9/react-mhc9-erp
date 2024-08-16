import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getBudgetProjects } from '../../../features/slices/budget-project/budgetProjectSlice'
import Loading from '../../../components/Loading'

const BudgetProjectList = () => {
    const dispatch = useDispatch();
    const { projects, pager, isLoading } = useSelector(state => state.budgetProject);

    useEffect(() => {
        dispatch(getBudgetProjects({ url: `/api/budget-projects/search` }))
    }, []);

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>กิจกรรม/โครงการ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">กิจกรรม/โครงการ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มรายการ</Link>
                </div>

                <div>
                    <table className="table table-bordered table-striped table-hover text-sm">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th>กิจกรรม/โครงการ</th>
                                <th className="w-[30%] text-center">แผนงาน</th>
                                <th className="w-[10%] text-center">ปีงบประมาณ</th>
                                <th className="w-[10%] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan={5} className="text-center"><Loading /></td>
                                </tr>
                            )}
                            {!isLoading && projects.map((project, index) => (
                                <tr>
                                    <td className="text-center">{index+1}</td>
                                    <td>{project.name}</td>
                                    <td>{project.plan?.name}</td>
                                    <td className="text-center">{project.year}</td>
                                    <td className="text-center p-1">
                                        <Link to={`/budget-project/${project.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/budget-project/${project.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(project.id)}>
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

export default BudgetProjectList