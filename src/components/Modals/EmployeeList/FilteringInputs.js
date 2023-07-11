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

    console.log(formData);

    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row gap-2 p-2">
                    <FormGroup>
                        <input
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleInputChange}
                            placeholder="ระบุชื่อ"
                            className="form-control"
                        />
                    </FormGroup>
                    <FormGroup>
                        <select
                            name="division"
                            value={filters.division}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">-- หน่วยงาน --</option>
                            {formData.divisions && formData.divisions.map(division => (
                                <option value={division.id} key={division.id}>
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleFilter}>
                            ตกลง
                        </button>
                    </FormGroup>
                </div>
            </Col>
        </Row>
    )
}

export default FilteringInputs
