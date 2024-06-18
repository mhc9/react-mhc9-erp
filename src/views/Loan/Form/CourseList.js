import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { toShortTHDate } from '../../../utils'

const CourseList = ({ courses, onRemoveCourse }) => {
    return (
        <Row>
            <Col>
                <ul>
                    {courses.map((course, index) => (
                        <li key={index} className="hover:bg-gray-200 p-1 rounded-md text-sm font-thin">
                            {/* - รุ่นที่ {course.seq_no ? course.seq_no : ++index} */}
                            {course?.course_date && <span className="ml-1">วันที่ {toShortTHDate(course?.course_date)}</span>} 
                            <span className="ml-1">
                                ณ {course?.room && <span className="mr-1">{course.room}</span>}
                                {course?.place?.name} จ.{course?.place?.changwat?.name}
                            </span>
                            <button
                                type="button"
                                className="btn btn-outline-danger text-sm rounded-full p-0 ml-2"
                                onClick={() => onRemoveCourse(course.id)}
                            >
                                <FaTimes />
                            </button>
                        </li>
                    ))}
                </ul>
            </Col>
        </Row>
    )
}

export default CourseList