import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import OverWriteMomentBE from '../../utils/OverwriteMomentBE'
import { generateQueryString } from '../../utils';
import moment from 'moment';

const TaskFilteringInputs = ({ initialFilters, onFilter, formData }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [selectedDate, setSelectedDate] = useState(moment());

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value });
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClearInputs = () => {
        setFilters(initialFilters);
        setSelectedDate(moment());

        onFilter(generateQueryString(initialFilters));
    };

    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row gap-2 p-2">
                    <FormGroup>
                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                            <DatePicker
                                format="DD/MM/YYYY"
                                value={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setFilters({ ...filters, date: date.format('YYYY-MM-DD') });
                                }}
                                variant="outlined"
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="text"
                            name="reporter"
                            value={filters.reporter}
                            onChange={handleInputChange}
                            placeholder="ผู้แจ้ง"
                            className="form-control text-sm"
                        />
                    </FormGroup>
                    <FormGroup>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleInputChange}
                            className="form-control text-sm"
                        >
                            <option value="">-- ประเภทปัญหา --</option>
                            {formData.types && formData.types.map(type => (
                                <option value={type.id} key={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleInputChange}
                            className="form-control text-sm"
                        >
                            <option value="">-- สถานะ --</option>
                            <option value="1">รอดำเนินการ</option>
                            <option value="2">ซ่อมแล้ว</option>
                            <option value="9">ยกเลิก</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="btn btn-outline-secondary text-sm" onClick={handleFilter}>
                            ตกลง
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger text-sm ml-1"
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

export default TaskFilteringInputs
