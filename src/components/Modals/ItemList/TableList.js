import React from 'react'
import { currency } from '../../../utils'

const TableList = ({ items, pager, onHide, onSelect }) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="text-center w-[5%]">#</th>
                        <th>รายการสินค้า</th>
                        <th className="text-center w-[15%]">ราคา</th>
                        <th className="text-center w-[10%]">เลือก</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center">{index+pager.from}</td>
                            <td>
                                <div className="flex flex-row">
                                    <img
                                        src={item.img_url}
                                        alt="item-img"
                                        className="w-[80px] h-auto"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-400">{item.category?.name}</p>
                                        <p className="text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-400 font-thin">{item.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <span className="text-red-500">{currency.format(item.price)}</span> บาท
                            </td>
                            <td className="text-center">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        onHide();
                                        onSelect(item);
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
    )
}

export default TableList
