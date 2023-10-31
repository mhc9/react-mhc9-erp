import React, { useEffect, useState } from 'react'
import { useGetInitialFormDataQuery } from '../../services/task/taskApi';
import Loading from '../Loading';
import api from '../../api';

const itemColors = ['secondary','success','warning','danger'];

const TaskStatusBadge = () => {
    const { data, isLoading } = useGetInitialFormDataQuery();
    const [statusCount, setStatusCount] = useState([]);

    useEffect(() => {
        getStatusCount();
    }, []);

    const getStatusCount = async () => {
        try {
            const res = await api.get('/api/tasks/count/status');

            setStatusCount(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCountByStatus = (id) => {
        const status = statusCount?.find(st => st.status === id);

        return status ? status.count : 0;
    }

    return (
        <div className="py-1">
            {isLoading && <div className="text-center"><Loading /></div>}
            {!isLoading && (
                <div className="flex flex-row gap-2">
                    {data && data.statuses.map((status, index) => (
                        <button type="button" className={`btn btn-outline-${itemColors[index]} text-sm`} key={status.id}>
                            {status.name}
                            <span className={`badge rounded-pill bg-${itemColors[index]} ml-1`}>
                                {getCountByStatus(status.id)}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TaskStatusBadge