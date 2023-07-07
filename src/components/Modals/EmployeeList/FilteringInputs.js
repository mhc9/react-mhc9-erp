import React from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'

const FilteringInputs = ({ filters, onFilter, onInputChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        onInputChange({ ...filters, [name]: value })
    };

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
                            placeholder=""
                            className="form-control"
                        />
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => onFilter()}>
                            ตกลง
                        </button>
                    </FormGroup>
                </div>
            </Col>
        </Row>
    )
}

export default FilteringInputs
