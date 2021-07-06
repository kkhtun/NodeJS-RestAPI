const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// Getting All
router.get('/', async (req, res)=> {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getTask, (req, res) => {
    res.json(res.task)
})

// Creating One
router.post('/', async (req, res)=> {
    const task = new Task({
        title: req.body.title,
        completion: req.body.completion
    })
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getTask, async (req, res)=> {
    res.task.title = req.body.title ? req.body.title : res.task.title
    res.task.completion = req.body.completion ? req.body.completion : res.task.completion
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getTask, async (req, res)=> {
    try {
        await res.task.remove()
        res.json({ message: "Task Deleted"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middlewares
async function getTask(req, res, next) {
    let task
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({ message: "Task does not exist"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.task = task
    next()
}

module.exports = router