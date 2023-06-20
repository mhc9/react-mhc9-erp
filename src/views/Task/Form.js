import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const taskSchema = Yup.object().shape({
    task_date: Yup.string().required(),
    task_time: Yup.string().required(),
    task_group_id: Yup.string().required(),
    description: Yup.string().required(),
    priority_id: Yup.string().required(),
});

const TaskForm = () => {
    const handleSubmit = (values, props) => {
        console.log(values, props);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    task_date: '',
                    task_time: '',
                    task_group_id: '',
                    description: '',
                    asset_id: '',
                    priority_id: '',
                    remark: '',
                }}
                validationSchema={taskSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>

                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default TaskForm