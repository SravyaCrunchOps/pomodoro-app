import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { CategoryScale, Colors } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie, Bar } from 'react-chartjs-2';
import './dashboard.css';
// import plugin from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, Colors, ChartDataLabels);
const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function DashboardChart() {
    const { list, df, topics } = useOutletContext();
    const [tags, setTags] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [monthlyData, setMonthlyData] = useState(null);

    useEffect(() => {
        if(df) {
            const userTags = df.map(t => t.Topic);
            const countTags = userTags.reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc
            }, {})
            setTags(countTags)
        }   

        // aggregate tasks by month and topic
        const tasks = list && list.userTasks
        const monthlyAreas = {}
        if(tasks) {
            tasks.map(task => {
                const date = new Date(task.date)
                const month = date.getMonth() + 1
                const year = date.getFullYear()
                const monthYear = `${month}/${year}`
                
                task.tasks.map(t => {
                    const dfEntry = df.find(d => d.Title === t.title)
                    if(dfEntry) {
                        const topic = dfEntry.Topic;

                        if(!monthlyAreas[monthYear]) {
                            monthlyAreas[monthYear] = {}
                        }
                        if(!monthlyAreas[monthYear][topic]) {
                            monthlyAreas[monthYear][topic] = 0
                        }
                        monthlyAreas[monthYear][topic] += 1
                    }
                })
            });
            console.log(monthlyAreas)
            setChartData(monthlyAreas)
        }
        
    },[df, list])


    const pdata = tags && {
        labels: Object.keys(tags),
        datasets: [{
            data: Object.values(tags),
            backgroundColor: ['#FF6384',
                          '#36A2EB',
                          '#D2CE56',
                          '#4BC0C0',
                          '#9966FF',
                          '#AD2F40',
                          '#34AE21'
                        ]
        }]
    }

    const bdata = tags && {
        labels: Object.keys(tags),
        datasets: [{
            data: Object.values(tags),
            backgroundColor: ['#FF6384',
                '#36A2EB',
                '#D2CE56',
                '#4BC0C0',
                '#9966FF',
                '#AD2F40',
                '#34AE21'
              ]
        }]
    }

    const mdata = monthlyData && {
        labels: Object.keys(monthlyData),
        datasets: [{
            data: Object.values(monthlyData),
            backgroundColor: ['#FF6384',
                '#36A2EB',
                '#D2CE56',
                '#4BC0C0',
                '#9966FF',
                '#AD2F40',
                '#34AE21'
              ]
        }]
    }

    const boptions = {
        plugins: {
            legend: false,
            title: {
                display: true,
                text: 'Your Overall Areas'
            },
            datalabels: {
                color: '#000',
                font: {
                    size: '20px',
                    weight: 'bold'
                }
            }
        }
    }

    const options = {
        plugins: {
            legend: true,
            title: {
                display: true,
                text: 'Monthly Areas',
            },
            colors: {
                enabled: true
            },
            datalabels: {
                anchor: 'middle',
                align: 'middle',
                formatter: (value, context) => value,
                color: '#000',
                font: {
                    size: '20px',
                    weight: 'bold'
                }
            }
        }
    }

    const handleMonth = (m, i) => {
        const presentYear = new Date().getFullYear()
        const my = `${i+1}/${presentYear}`
        const cd = chartData[my]
        if(cd) {
            console.log(cd)
            setMonthlyData(cd)
        } else {
            console.log('No data')
            setMonthlyData('No Data')
        }
    }

    return (
        <div className='container'> 
            <div className='mb-4 w-100'>
                {tags && <Bar options={boptions} data={bdata} /> }
            </div>

            <hr />

            <div className='row mb-4'>
                <h3 className='mb-3 text-secondary'>Monthly Concentrated Areas</h3>
                <div className='col-md-6'>
                    {month.map((m, i) => {
                        return (
                            <button 
                                key={m}
                                className='btn btn-outline-primary m-md-2 me-2 px-md-4 py-md-1'
                                onClick={()=>handleMonth(m, i)}
                            >
                                {m}
                            </button>
                        )
                    })}
                </div>
                <div className='col-md-6 pie'>
                    {monthlyData && <Pie options={options} data={mdata} />}
                </div>
            </div>
            
        </div>
    )
}


export default DashboardChart