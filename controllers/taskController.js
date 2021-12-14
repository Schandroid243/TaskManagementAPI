const Task = require('../models/taskModel');
const paginate = require('express-paginate');


const create = async (req, res) => {
    try{
         await Task.create({
            title: req.body.title,
            time: req.body.time,
            createdBy: res.locals.user._id,
        });
        return res.status(201).json({
            message: 'Task created successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

const remove = async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.taskId);
        return res.status(204).json({
            message: 'Task deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Task deleted successfully',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Task.findByIdAndUpdate(req.paramas.taskId);
        return res.status(201).json({
            message: 'Task updated successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message,
            success: true,
        })
    }
}

const getOne = async (req, res) => {
    try{    
       const task = await Task.findById(req.params.taskId);
       if(!task) {
           return res.status(404).json({
               message: 'Task not found',
               success: false,
            })
       }
        return res.status(200).json(task)
    }catch(err) {
        return res.status(500).json({
            message: err.message,
            success: true,
        })
    }
}

const getAll= async (req, res) => {
    try{
        const [results, tasks] = await Promise.all([
            Task.find({})
                .sort({title: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Task.count({})
        ])
        const pageCount = Math.ceil(tasks / req.query.limit);
        return res.status(200).json({
            data: results,
            tasks,
            pageCount,
            pages: paginate.getArrayPages(3, pageCount, 1)
        })
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: true,
        })
    }
    
}

module.exports = { create, remove, update, getOne, getAll };