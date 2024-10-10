const express = require('express')
const mongoose = require('mongoose')
const TaskTracker = require('./model')
const cors = require('cors')
const axios = require('axios')
const config = require('./config');
const port = config.server.port

const app = express();

app.use(express.json());
app.use(cors());

// mongodb connection
const mongoUrl = config.database.mongoUrl;
const db = mongoose.connect(mongoUrl);

app.post('/dashboard', async(req, res) => {
    const user = req.body;
    const result = await axios.post('http://localhost:7070/tasks', user, {
        headers: { 'Content-Type': 'application/json' }
    })
    const userData = result.data.existingUser.userTasks
     // multi dimensional array
    const tasks = userData.map(task => task['tasks'].map(t => t['title']))
    // to convert multi dimensional array into single dimension
    const flattened_array = tasks.reduce((acc, val) => acc.concat(val), []);

    try {
        const r1 = await axios.post('http://127.0.0.1:5000/analyze', flattened_array)
        return res.status(200).json({
            df: r1.data.df, 
            topic_labels: r1.data.topic_labels, 
            list: result.data.existingUser
        })
    } catch(err) {
        console.log(err)
    }
})

app.get('/aggregate', async(req, res) => {
    const userId = req.query.userId
    const userDetails = await TaskTracker.findOne({ "userData.userId": userId })
    const tasks = userDetails.userTasks
    const topicLabels = {
        0: "Programming & Work",
        1: "Hobby",
        2: "Exercise & Health",
        3: "Personal Work",
        4: "Food & Drink",
        5: "Social Activities",
        6: "Cooking",
        7: "Learning & Development"
    };
    const aggregateData = {}

    tasks.forEach(task => {
        const date = new Date(task.date)
        const month = date.getMonth() + 1; // month is 0 indexed
        const year = date.getFullYear();
        const monthYear = `${month}/${year}`
        // console.log(month, year, monthYear)

        task.tasks.forEach(t => {
            const topic = topicLabels[t.act];

            if (!aggregateData[monthYear]) {
                aggregateData[monthYear] = {};
            }

            if (!aggregateData[monthYear][topic]) {
                aggregateData[monthYear][topic] = 0;
            }

            aggregateData[monthYear][topic] += t.timer; 
        })
    })
    res.json(aggregateData)
})

app.listen(port, async(err, server) => {
    if(err) console.log('server is not connected')
    console.log(`server is running at port: ${port}`)
    if(db) {
        console.log('Mongodb is connected')
    }
})