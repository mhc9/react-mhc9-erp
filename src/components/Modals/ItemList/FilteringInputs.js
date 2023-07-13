import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'

const FilteringInputs = ({ initialFilters, onFilter, formData }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value })
    };

    const handleFilter = () => {
        let queryStr = '';
        for (const [key, val] of Object.entries(filters)) {
            queryStr += `&${key}=${val}`;
        }

        onFilter(queryStr);
    };

    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row gap-2 p-2">
                    <FormGroup>
                        <input
                            type="text"
                            name=""
                            placeholder="ค้นหาด้วยชื่อ"
                            className="form-control"
                        />
                    </FormGroup>
                    <FormGroup>
                        <select
                            name="category"
                            className="form-control"
                        >
                            <option value="">-- ทั้งหมด --</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="btn btn-outline-secondary">ตกลง</button>
                    </FormGroup>
                </div>
            </Col>
        </Row>
    )
}

export default FilteringInputs
