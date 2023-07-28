import React from 'react'

const ChangeAvatar = ({ selected, onSelect }) => {
    return (
        <div>
            <label>
                <input type="file" className="hidden" onChange={(e) => onSelect(e.target.files[0])} />
                {!selected ? (
                    <p className="hover:text-blue-600 mt-3 sm:mb-3 cursor-pointer">
                        เปลี่ยนรูป
                    </p>
                ) : (
                    <button type="button" className="btn btn-outline-success mt-3 sm:mb-3">
                        อัพโหลด
                    </button>
                )}
            </label>
        </div>
    )
}

export default ChangeAvatar
