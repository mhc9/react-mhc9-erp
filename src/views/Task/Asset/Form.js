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
                <div className="form-control bg-gray-100 text-sm">
                    {selected?.asset_no}
                </div>
                <button type="button" className="btn btn-outline-secondary text-sm" onClick={() => setOpenModal(true)}>
                    ...
                </button>
            </div>
            <div className="form-control min-h-[34px] bg-gray-100 text-sm">
                {selected?.name}
            </div>
            <button
                type="button"
                className="btn btn-outline-primary text-sm flex flex-row items-center"
                onClick={handleAdd}
                disabled={!selected}
            >
                <FaPlus /> เพิ่ม
            </button>
        </div>
    )
}

export default TaskAssetForm
    