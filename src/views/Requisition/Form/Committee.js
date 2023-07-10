import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import ModalEmployeeList from '../../../components/Modals/EmployeeList';

const Committee = ({ defaultValue, onUpdate }) => {
    const [committees, setCommittees] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (employee) => {
        if (committees.find(committee => committee.id === employee.id)) {
            window.alert('คุณเลือกรายการซ้ำ กรณาเลือกใหม่!!');
            return;
        }

        const newCommittees = [...committees, employee];
        setCommittees(newCommittees);
        onUpdate(newCommittees);
    };

    const handleRemove = (id) => {
        const newCommittees = committees.filter(committee => committee.id !== id);

        setCommittees(newCommittees);
        onUpdate(newCommittees);
    };

    return (
        <div className="border w-full p-2 rounded-md">
            <ModalEmployeeList
                isShow={showModal}
                onHide={() => setShowModal(false)}
                onSelect={handleSelect}
            />

            <h3 className="font-bold text-lg mb-1">ผู้ตรวจรับ</h3>
            <ul className="flex flex-col text-sm ml-2">
                {committees.length > 0 ? committees.map((committee, index) => (
                    <li className="flex flex-row gap-2 w-full p-1" key={committee.id}>
                        <div className="min-w-[50%] flex flex-row">
                            <span className="min-w-[45%]">{index+1}. {committee.prefix.name}{committee.firstname} {committee.lastname}</span>
                            <span><b>ตำแหน่ง</b> {committee.position.name}{committee.level && committee.level.name}</span>
                        </div>
                        <button type="button" className="btn btn-outline-danger btn-sm px-1" onClick={() => handleRemove(committee.id)}>
                            <FaMinus size={'12px'} />
                        </button>
                        {index === committees.length - 1 && (
                            <button type="button" className="btn btn-outline-primary btn-sm px-1" onClick={() => setShowModal(true)}>
                                <FaPlus size={'12px'} />
                            </button>
                        )}
                    </li>
                )) : (
                    <li className="flex flex-row w-full p-1">
                        <span className="min-w-[50%] text-red-500">ยังไม่มีรายการ</span>
                        <button type="button" className="btn btn-outline-primary btn-sm px-1" onClick={() => setShowModal(true)}>
                            <FaPlus size={'12px'} />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Committee