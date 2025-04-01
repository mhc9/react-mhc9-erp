import React, { useState } from 'react'
import { filesizes } from '../../utils';

const MultipleFileUpload = ({ files, onSelect, onDelete }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        onSelect([...files, file]);
    };

    return (
        <div>
            <div className="file-upload">
                <div className="file-upload-box">
                    <input
                        type="file"
                        className="file-upload-input"
                        onChange={handleFileChange}
                        multiple
                    />

                    <span>Drag and Drop or <span className="file-upload-link">Choose your files</span></span>
                </div>
            </div>
            <div className="file-attach">
                {files.map((file, index) => (
                    <div className="file-attach-box" key={index}>
                        <div className="file-image">
                            <img src={URL.createObjectURL(file)} alt="" />
                        </div>
                        <div className="file-detail">
                            <h6>{file?.name}</h6>
                            <p>
                                <span className="me-2">Size: {filesizes(file?.size)}</span>
                                <span>Modified Time: {file?.lastModifiedDate.toLocaleString('en-IN')}</span>
                            </p>

                            <div className="file-actions">
                                <button type="button" className="file-action-btn" onClick={() => onDelete(index)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="text-end">
                <button className="btn-upload">Upload</button>
            </div> */}
        </div>
    )
}

export default MultipleFileUpload
