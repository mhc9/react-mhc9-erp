import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { DatePicker } from '@material-ui/pickers'
import { FaSearch, FaPlus } from 'react-icons/fa'
import moment from 'moment'
import { getPlaces } from '../../../features/slices/place/placeSlice'
import ModalPlaceForm from '../../../components/Modals/Place/Form'
import ModalPlaceList from '../../../components/Modals/Place/List'

const AddCourse = ({ courses, expenseCalc, onAdd }) => {
    const dispatch = useDispatch();
    const { place: newPlace } = useSelector(state => state.place);
    const [showPlaceModal, setShowPlaceModal] = useState(false);
    const [showPlaceFormModal, setShowPlaceFormModal] = useState(false);
    const [selectedCourseDate, setSelectedCourseDate] = useState(moment());
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (newPlace) {
            setPlace(newPlace);

            dispatch(getPlaces({ url: '/api/places/search' }));
        }
    }, [newPlace]);

    const handleSubmit = (values, formik) => {
        const course = {
            ...values,
            id: courses.length + 1,
            course_date: values.expense_calc === '2' ? selectedCourseDate.format('YYYY-MM-DD') : '',
            room: values.room
        };

        onAdd(course);

        formik.resetForm();
        setPlace(null);
        setSelectedCourseDate(moment());
    }

    return (
        <Formik
            initialValues={{
                id: '',
                course_date: '',
                room: '',
                place_id: '',
                place: null
            }}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Row>
                        <ModalPlaceList
                            isShow={showPlaceModal}
                            onHide={() => setShowPlaceModal(false)}
                            onSelect={(place) => {
                                setPlace(place);
                                formik.setFieldValue('place_id', place.id);
                                formik.setFieldValue('place', place);
                            }}
                            />

                        <ModalPlaceForm
                            isShow={showPlaceFormModal}
                            onHide={() => setShowPlaceFormModal(false)}
                        />

                        {expenseCalc === '2' && (
                            <Col md={2}>
                                <label htmlFor="">วันที่</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedCourseDate}
                                    onChange={(date) => {
                                        setSelectedCourseDate(date);
                                        formik.setFieldValue('course_date', moment(date).format('YYYY-MM-DD'));
                                    }}
                                />
                            </Col>
                        )}
                        <Col md={3}>
                            <label htmlFor="">ห้อง</label>
                            <input
                                type="text"
                                name="room"
                                value={formik.values.room}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            />
                        </Col>
                        <Col md={expenseCalc === '2' ? 6 : 8}>
                            <label htmlFor="">สถานที่จัด</label>
                            <div className="input-group">
                                <div className="form-control text-sm h-[34px] bg-gray-100">
                                    {place?.name} {place && <span>จ.{place?.changwat?.name}</span>}
                                </div>
                                <button type="button" className="btn btn-outline-secondary text-sm" onClick={() => setShowPlaceModal(true)}>
                                    <FaSearch />
                                </button>
                                <button type="button" className="btn btn-outline-primary text-sm px-2" onClick={() => setShowPlaceFormModal(true)}>
                                    New
                                </button>
                            </div>
                        </Col>
                        <Col md={1}>
                            <label htmlFor=""></label>
                            <div className='flex flex-row items-center h-[36px]'>
                                <button
                                    type="button"
                                    className={`btn btn-outline-primary rounded-full p-1`}
                                    onClick={formik.submitForm}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </Col>
                    </Row>
                )
            }}
        </Formik>
    )
}

export default AddCourse