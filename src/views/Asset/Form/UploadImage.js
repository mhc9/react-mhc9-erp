import React from 'react'
import { upload } from '../../../features/asset/assetSlice';
import { useDispatch } from 'react-redux';

const UploadImage = ({ asset, selectedImage, handleSelectedImage }) => {
    const dispatch = useDispatch();

    const handleUploadImage = (id) => {
        let data = new FormData();
        data.append('img_url', selectedImage);

        dispatch(upload({ id, data }));

        handleSelectedImage(null);
    };

    return (
        <div>
            <label>
                <input
                    type="file"
                    onChange={(e) => handleSelectedImage(e.target.files[0])}
                    className="hidden"
                />
                {!selectedImage && (
                    <p className="btn btn-outline-primary btn-sm">
                        เปลี่ยนรูป
                    </p>
                )}
            </label>
            {selectedImage && (
                <button type="button" className="btn btn-outline-success btn-sm" onClick={() => handleUploadImage(asset.id)}>
                    อัพโหลด
                </button>
            )}
        </div>
    )
}

export default UploadImage