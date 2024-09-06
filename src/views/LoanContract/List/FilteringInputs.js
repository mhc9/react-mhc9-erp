import React, { Fragment, useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import { useStyles } from '../../../hooks/useStyles'
import { useGetInitialFormDataQuery } from '../../../features/services/loan-contract/loanContractApi'
import { generateQueryString } from '../../../utils'

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const classes = useStyles();
    const [filters, setFilters] = useState(initialFilters);
    const [selectedYear, setSelectedYear] = useState(moment());
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    return (
        <div className="border rounded-md py-2 px-3 mb-2">
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-1">
                    <label htmlFor="">ปีงบ :</label>
                    <div className="w-[60%]">
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
                </div>
                <div className="flex flex-row items-center gap-1 w-[35%]">
                    <label htmlFor="">ผู้ยืม :</label>
                    <div className="w-[80%]">
                        <select
                            name="employee"
                            value={filters.employee}
                            onChange={handleInputChange}
                            className="form-control text-sm"
                        >
                            <option value="">-- ผู้ยืมทั้งหมด --</option>
                            {formData && formData.departments.map(dep => (
                                <Fragment key={dep.id}>
                                    <optgroup label={dep.name} />
                                    {formData && formData.employees.filter(emp => emp.member_of[0]?.department_id === dep.id).map(employee => (
                                        <option value={employee.id} key={employee.id}>
                                            {employee.prefix?.name}{employee.firstname} {employee.lastname}
                                        </option>
                                    ))}
                                </Fragment>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleFilter}>
                    ค้นหา
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                    setFilters(initialFilters);
                    handleFilter()
                }}>
                    เคลียร์
                </button>
            </div>
        </div>
    )
}

export default FilteringInputs