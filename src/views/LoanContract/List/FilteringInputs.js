import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import { useStyles } from '../../../hooks/useStyles'

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const classes = useStyles();
    const [filters, setFilters] = useState(initialFilters);
    const [selectedYear, setSelectedYear] = useState(moment());

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="border rounded-md py-2 px-3 mb-2">
            <div className="flex flex-row items-center gap-1">
                <label htmlFor="">ปีงบ :</label>
                <div className="w-[20%]">
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
        </div>
    )
}

export default FilteringInputs