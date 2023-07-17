import React from 'react'

const Item = ({ item }) => {
    return (
        <div className="flex flex-row">
            {![3,4].includes(item?.category?.asset_type_id) && (
                <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/products/thumbnails/${item?.img_url}`}
                    alt="item-img"
                    className="w-[80px] h-auto border rounded-sm mr-2"
                />
            )}
            <div>
                <p className="text-sm text-gray-400">{item?.category?.name}</p>
                <p className="text-sm">
                    {item?.name} |
                    หน่วยนับ : <span className="font-thin">{item.unit?.name}</span>
                </p>
                <p className="text-xs text-gray-400 font-thin">{item?.description}</p>
            </div>
        </div>
    )
}

export default Item
