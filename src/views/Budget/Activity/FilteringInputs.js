import React, { useState } from 'react'
import { FaSlidersH } from 'react-icons/fa'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { DatePicker } from '@material-ui/pickers'
import { generateQueryString} from '../../../utils'
import { useStyles } from '../../../hooks/useStyles'
import { useGetInitialFormDataQuery } from '../../../features/services/budget-activity/budgetActivityApi'
import Loading from '../../../components/Loading'
import moment from 'moment'

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const classes = useStyles();
    const [filters, setFilters] = useState(initialFilters);
    const [selectedYear, setSelectedYear] = useState(initialFilters ? moment(`${initialFilters.year}-01-01`) : moment())
    const { data: formData, isLoading } = useGetInitialFormDataQuery({ year: filters.year });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };
    
    const handleClear = () => {
        setFilters(initialFilters);
        onFilter(generateQueryString(initialFilters));
    };

    return (
        <div className="filtering-wrapper border rounded-md py-3 px-4 mb-2">
            <Row>
                <Col lg={11}>
                    <Row>
                        
                        <Col className="px-1 mb-2" md={8}>
                            <FormGroup>
                                <input
                                    type="text"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleInputChange}
                                    placeholder="ชื่อกิจกรรม"
                                    className="form-control text-sm"
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1 mb-2" md={4}>
                            <FormGroup>
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
                            </FormGroup>
                        </Col>
                        <Col className="px-1 max-md:mb-2" md={6}>
                            <FormGroup>
                                <select
                                    name="type"
                                    value={filters.type}
                                    onChange={handleInputChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- ประเภท --</option>
                                    {formData && formData.types.map(type => (
                                        <option value={type.id} key={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                </FormGroup>
                        </Col>
                        {/* <Col className="px-1 mb-2" md={6}>
                            <FormGroup>
                                <select
                                    name="plan"
                                    value={filters.plan}
                                    onChange={handleInputChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- แผนงาน --</option>
                                    {formData && formData.plans.map(plan => (
                                        <option value={plan.id} key={plan.id}>
                                            {plan.plan_no} {plan.name}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col> */}
                        <Col className="px-1 max-lg:mb-2" md={6}>
                            <FormGroup>
                                {isLoading && <div className="form-control text-sm"><Loading /></div>}
                                {(!isLoading && formData) && (
                                    <select
                                        name="project"
                                        value={filters?.project}
                                        onChange={handleInputChange}
                                        className="form-control text-sm"
                                    >
                                        <option value="">--เลือกโครงการ/ผลผลิต--</option>
                                        {formData.projects.map(project => (
                                            <option value={project.id} key={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col lg={1} className="max-lg:pr-1 lg:pl-1">
                    <div className="max-lg:float-right">
                        <button type="button" className="btn btn-outline-secondary btn-sm lg:mb-1 px-[0.7rem]" onClick={() => handleFilter()}>
                            ค้นหา
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm max-lg:ml-1" onClick={() => handleClear()}>
                            เคลียร์
                        </button>
                    </div>
                </Col>
            </Row>
        </div>            
    )
}

export default FilteringInputs