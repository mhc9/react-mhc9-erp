import React from 'react'

const Gallery = () => {
    return (
        <div className="flex flex-col">
            <h3 className="mb-2 font-bold">รูปพัสดุ</h3>
            <div className="border w-full h-[150px] text-center rounded-md mb-2">
                <img src='' alt='asset-thumbnail' />
            </div>
            <div className="flex flex-row gap-1">
                {[1,2,3,4].map((image, index) => (
                    <div key={index} className="border rounded-md w-4/12 h-[80px]">image 1</div>
                ))}
            </div>
        </div>
    )
}

export default Gallery