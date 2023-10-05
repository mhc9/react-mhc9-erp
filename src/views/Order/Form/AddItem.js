import React from 'react'
import { FaSearch } from 'react-icons/fa'

const AddItem = () => {
    return (
        <div className="flex flex-row mb-2">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control text-sm"
                    placeholder="รายการ"
                />
                <button type="button" className="btn btn-outline-secondary" onClick={() => console.log('Modal')}>
                    <FaSearch />
                </button>
            </div>
            <input
                type="text"
                className="form-control text-sm w-[18%] ml-1"
                placeholder="ราคาต่อหน่วย"
            />
            <input
                type="text"
                className="form-control text-sm w-[12%] ml-1"
                placeholder="จำนวน"
            />
            <input
                type="text"
                className="form-control text-sm w-[18%] ml-1"
                placeholder="รวมเป็นเงิน"
            />
            <div className="flex flex-row w-[15%]">
                <button className="btn btn-outline-primary btn-sm ml-1">Add</button>
                <button className="btn btn-outline-danger btn-sm ml-1">clear</button>
            </div>
        </div>
    )
}

export default AddItem