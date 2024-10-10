import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


function DashboardList() {
    const { list, df } = useOutletContext();

    function styleTags(cluster) {
        switch(cluster) {
            case 0: return 'bg-danger text-white rounded-2 me-2 p-1'
            case 1: return 'bg-success text-white rounded-2 me-2 p-1'
            case 2: return 'bg-info text-white rounded-2 me-2 p-1'
            case 3: return 'bg-warning text-white rounded-2 me-2 p-1'
            case 4: return 'bg-secondary text-white rounded-2 me-2 p-1'
            case 5: return 'bg-dark text-white rounded-2 me-2 px-2 p-1'
            case 6: return 'bg-primary text-white rounded-2 me-2 p-1'
            case 7: return 'bg-danger text-white rounded-2 me-2 p-1'
        }
    }

    return (
        <div className='my-3'>
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Focus time</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {list && df && list.userTasks.map(t => {
                        return (
                            <tr key={t.date}>
                                <td>{t.date}</td>
                                <td>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {t.tasks.map(task => {
                                            return (
                                                <li key={task.id}>{task.title ? task.title : '-'}</li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {t.tasks.map(task => {
                                            return (
                                                <li key={task.id}>{task.act ? task.act * Number(task.timer) : 0}<span> min</span></li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{ listStyle: 'none' }}>
                                        {df && t.tasks.map(task => {
                                            const matchedTopic = df.find(topic => topic.Title === task.title)
                                            if(matchedTopic) {
                                                return (
                                                    <span key={matchedTopic.Cluster} className={styleTags(matchedTopic.Cluster)}>
                                                        {matchedTopic.Topic}
                                                    </span>
                                                )
                                            }
                                        })}
                                    </ul>
                                </td>
                            </tr>
                        )

                    })}
                </tbody>
            </Table>

        </div>
    )
}


export default DashboardList