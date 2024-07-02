import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useGetInitialFormDataQuery } from '../../../features/services/place/placeApi'
import { generateQueryString } from '../../../utils'

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const [filters, setFilters] = useState(initialFilters);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...filters, [name]: value };

        setFilters(updated);
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClearInputs = () => {
        setFilters(initialFilters);

        onFilter(generateQueryString(initialFilters));
    };

    return (
        <div className="border rounded-md p-2">
            <Row className="mb-2">
                <Col>
                    <label htmlFor="">ชื่อสถานที่</label>
                    <input
                        name="name"
                        value={filters.name}
                        onChange={handleInputChange}
                        className="form-control text-sm" />
                </Col>
                <Col>
                    <label htmlFor="">ประเภท</label>
                    <select
                        name="place_type_id"
                        value={filters.place_type_id}
                        onChange={handleInputChange}
                        className="form-control text-sm"
                    >
                        <option value="">-- ทั้งหมด --</option>
                        <option value="1">โรงแรม</option>
                        <option value="2">โรงเรียน/มหาวิทยาลัย</option>
                        <option value="3">หน่วยงานสาธารณสุข</option>
                        <option value="4">หน่วยงานท้องถิ่น</option>
                        <option value="5">หน่วยงานราชการอื่นๆ</option>
                        <option value="6">บริษัท/เอกชน</option>
                        <option value="99">อื่นๆ</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col className="flex flex-row justify-center">
                    <button type="button" className="btn btn-outline-primary btn-sm mr-1" onClick={handleFilter}>
                        ตกลง
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleClearInputs}>
                        เคลียร์
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default FilteringInputs