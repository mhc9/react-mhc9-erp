import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { generateQueryString } from '../../utils';

const FilteringInputs = ({ initialFilters, onFilter, formData }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value })
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClearInputs = () => {
        setFilters(initialFilters);

        onFilter(generateQueryString(initialFilters));
    };

    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row gap-2 p-2">
                    <FormGroup>
                        <input
                            type="text"
                            name="pr_no"
                            value={filters.pr_no}
                            onChange={handleInputChange}
                            placeholder="เลขที่คำขอ"
                            className="form-control"
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="date"
                            name="pr_date"
                            value={filters.pr_date}
                            onChange={handleInputChange}
                            placeholder="วันที่คำขอ"
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
                        <button
                            type="button"
                            className="btn btn-outline-danger ml-1"
                            onClick={handleClearInputs}
                        >
                            เคลียร์
                        </button>
                    </FormGroup>
                </div>
            </Col>
        </Row>
    )
}

export default FilteringInputs
