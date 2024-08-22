import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { generateQueryString } from '../../../utils';

const FilteringInputs = ({ initialFilters, onFilter, formData }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value })
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClear = () => {
        setFilters(initialFilters);

        onFilter(generateQueryString(filters));
    }

    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row items-center gap-2 p-2">
                    <FormGroup className="w-[25%]">
                        <input
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleInputChange}
                            placeholder="งบประมาณ"
                            className="form-control text-sm"
                        />
                    </FormGroup>
                    {/* <FormGroup>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleInputChange}
                            className="form-control text-sm"
                        >
                            <option value="">-- ประเภท --</option>
                            {formData.types && formData.types.map(type => (
                                <option value={type.id} key={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup> */}
                    <FormGroup>
                        <select
                            name="plan"
                            value={filters.plan}
                            onChange={handleInputChange}
                            className="form-control text-sm"
                        >
                            <option value="">-- ประเภท --</option>
                            {formData.plans && formData.plans.map(plan => (
                                <option value={plan.id} key={plan.id}>
                                    {plan.plan_no} {plan.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="btn btn-outline-secondary btn-sm mr-1" onClick={() => handleFilter()}>
                            ตกลง
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleClear()}>
                            เคลียร์
                        </button>
                    </FormGroup>
                </div>
            </Col>
        </Row>
    )
}

export default FilteringInputs
