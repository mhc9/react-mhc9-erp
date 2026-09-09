import React, { useEffect, useState } from 'react'
import { Field } from 'formik'

const Checkbox = (props) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(props.checked == 1)
    }, [props.checked])

    return (
        <div>
            <Field
                type="checkbox"
                name={props.name}
                value={props.value}
                checked={checked}
                onChange={(e) => {
                    setChecked(e.target.checked)
                    props.handleChange(e.target.checked)
                }}
                className="me-1"
            /> {props.label}
        </div>
    )
}

export default Checkbox
