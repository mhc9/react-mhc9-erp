import React from 'react'

const OrderItems = ({ items = [] }) => {
    return (
        <div>
            <table className="table table-bordered text-sm mb-2">
                <thead>
                    <tr>
                        <th className="text-center w-[5%]">#</th>
                        <th>รายการ</th>
                        <th className="text-center w-[12%]">ราคาต่อหน่วย</th>
                        <th className="text-center w-[8%]">จำนวน</th>
                        <th className="text-center w-[12%]">รวมเป็นเงิน</th>
                        <th className="text-center w-[11%]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length === 0 && (
                        <tr className="font-thin text-center">
                            <td colSpan={6}><span className="text-red-400">-- ยังไม่มีรายการ --</span></td>
                        </tr>
                    )}
                    {items && items.length > 0 && items.map((item, index) => (
                        <tr className="font-thin">
                            <td></td>
                            <td></td>
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

export default OrderItems