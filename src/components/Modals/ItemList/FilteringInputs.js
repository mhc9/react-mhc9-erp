import React from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'

const FilteringInputs = () => {
    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row gap-2 p-2">
                    <FormGroup>
                        <input
                            type="text"
                            name=""
                            placeholder=""
                            className="form-control"
                        />
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
