import React, { useState } from 'react'
import { FaSlidersH } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import { DatePicker } from '@material-ui/pickers'
import { generateQueryString} from '../../utils'
import { useStyles } from '../../hooks/useStyles'
import { useGetInitialFormDataQuery } from '../../features/services/budget/budgetApi'
import Loading from '../../components/Loading'
import moment from 'moment'

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const classes = useStyles();
    const [collapse, setCollapse] = useState(true);
    const [filters, setFilters] = useState(initialFilters);
    const [selectedYear, setSelectedYear] = useState(initialFilters ? moment(initialFilters.year) : moment())
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
        setCollapse(true);
    };
    
    const handleClearInput = () => {
        setFilters(initialFilters);
        onFilter(generateQueryString(initialFilters));
        setCollapse(true);
    };

    return (
        <div className="border rounded-md p-3 mb-2">
            <div className="flex flex-row justify-between items-center gap-1">
                <input
                    type="text"
                    name="name"
                    value={filters?.name}
                    onChange={handleInputChange}
                    className="form-control text-sm"
                    placeholder="ค้นหาด้วยชื้อ"
                />

                <button className="btn btn-outline-secondary btn-sm" onClick={handleFilter}>
                    ค้นหา
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={handleClearInput}>
                    เคลียร์
                </button>
                <button className="btn btn-outline-default" onClick={() => setCollapse(!collapse)}>
                    <FaSlidersH className="text-gray-500" />
                </button>
            </div>
            <div className="accordion accordion-flush">
                <div className="accordion-item">
                    <div className={`accordion-collapse ${collapse ? 'collapse' : 'show'}`}>
                        <div className="accordion-body px-4 pb-0">
                            <Row>
                                <Col md={3}>
                                    <label htmlFor="">ปีงบ :</label>
                                    <div>
                                        <DatePicker
                                            format="YYYY"
                                            views={['year']}
                                            value={selectedYear}
                                            onChange={(date) => {
                                                setSelectedYear(date);
                                                setFilters(prev => ({ ...prev, ['year']: moment(date).year() }));
                                            }}
                                            className={classes.muiTextFieldInput}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <label htmlFor="">แผนงาน :</label>
                                    {isLoading && <div className="form-control text-sm"><Loading /></div>}
                                    {(!isLoading && formData) && (
                                        <select
                                            name="plan"
                                            value={filters?.plan}
                                            onChange={handleInputChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">--เลือกแผน--</option>
                                            {formData.plans.map(plan => (
                                                <option value={plan.id} key={plan.id}>
                                                    {plan.plan_no} {plan.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringInputs