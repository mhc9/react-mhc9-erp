import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

const TaskList = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">บริการ</Breadcrumb.Item>
                <Breadcrumb.Item active>สถานะการซ่อม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">สถานะการซ่อม</h2>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {equipments && equipments.map((eq, index) => (
                                <tr>
                                    <td></td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TaskList