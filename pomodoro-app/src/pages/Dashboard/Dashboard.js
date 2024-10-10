import React, { useState, useEffect, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { UserContext } from '../../App';
import axios from 'axios';
import config from '../../config';
import './dashboard.css';

const dashboardUrl = "http://localhost:7010"


function Dashboard() {
    const { user, xCorrId } = useContext(UserContext);
    const [list, setList] = useState(null)
    const [df, setDf] = useState(null)
    const [topics, setTopics] = useState(null)

    useEffect(() => {
        if (user) {
            axios.post(`${dashboardUrl}/dashboard`, user, {
                headers: {
                    'x-correlation-id': xCorrId
                }
            })
            .then(res => {
                if(res.data){
                    setList(res.data.list)
                    setDf(JSON.parse(res.data.df))
                    setTopics(res.data.topic_labels)
                } else {
                    setList(null)
                }
            })
        }
    },[user])

    return (
        <>
            <div className='row flex-column flex-md-row flex-nowrap w-100'>
                {/* submenu */}
                <ul className='col-md-2 me-2 my-0 submenu'>
                    <li className='my-5'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='my-5'>
                        <Link to='mytasks'>Tasks</Link>
                    </li>
                    <li className='my-5'>
                        <Link to='mychart'>Analytics</Link>
                    </li>
                </ul>

                {/* submenu for mobile */}
                <ul className='d-md-none d-flex justify-content-center py-2 list-unstyled'>
                    <li className='me-4'>
                        <Link className='text-dark' to='mytasks'>Tasks</Link>
                    </li>
                    <li>
                        <Link className='text-dark' to='mychart'>Analytics</Link>
                    </li>
                </ul>

                <div className='col-auto'>
                    <Outlet context={{list, df, topics}} />
                </div>
            </div>

        </>
    )
}


export default Dashboard