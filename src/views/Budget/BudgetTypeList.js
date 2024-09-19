import React from 'react'

const BudgetTypeList = ({ data }) => {
    return (
        <div className="border">
            <table className="table tabl-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center">#</th>
                        <th className="text-center">ประเภทงบ</th>
                        <th className="w-[20%] text-center">ยอดจัดสรร</th>
                        <th className="w-[10%] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item => (
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BudgetTypeList