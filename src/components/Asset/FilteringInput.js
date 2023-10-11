import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { generateQueryString } from '../../utils'

const AssetFilteringInput = ({ initialFilters, onFilter, formData }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const _filters = { ...filters, [name]: value };

        setFilters(_filters);
        onFilter(generateQueryString(_filters));
    };

    return (
        <div className="flex flex-col gap-2 my-2">
            <Row>
                <Col md={4}>
                    <input
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="ชื่อพัสดุ"
                    />
                </Col>
                {/* <Col md={4}>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">-- ชนิดพัสดุ --</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Col> */}
                <Col md={4}>
                    <select
                        name="group"
                        value={filters.group}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">-- กลุ่มพัสดุ --</option>
                        {formData.groups && formData.groups.map(group => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </Col>
                <Col md={4}>
                    <select
                        name="owner"
                        value={filters.owner}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">-- ผู้รับผิดชอบ --</option>
                        {formData.employees && formData.employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {`${employee.firstname} ${employee.lastname}`}
                            </option>
                        ))}
                    </select>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default AssetFilteringInput
