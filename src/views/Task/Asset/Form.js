import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import ModalAssetList from '../../../components/Modals/AssetList'

const TaskAssetForm = ({ onAdd }) => {
    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleAdd = () => {
        onAdd(selected);

        setSelected(null);
    };

    return (
        <div className="flex flex-row items-center gap-1 mb-1">
            <ModalAssetList
                isShow={openModal}
                handleHide={() => setOpenModal(false)}
                handleSelect={(asset) => setSelected(asset)}
            />

            <div className="input-group w-4/12">
                <div className="form-control h-10 bg-gray-100">
                    {selected?.asset_no}
                </div>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setOpenModal(true)}>
                    ...
                </button>
            </div>
            <div className="form-control h-10 bg-gray-100">
                {selected?.name}
            </div>
            <button
                type="button"
                className="btn btn-outline-primary flex flex-row items-center"
                onClick={handleAdd}
                disabled={!selected}
            >
                <FaPlus /> เพิ่ม
            </button>
        </div>
    )
}

export default TaskAssetForm
    