const AccessLevel = require('../models/accessLevelModel');
const paginate = require('express-paginate');


const create = async (req, res) => {
    try{
         await AccessLevel.create({
            accessName: req.body.accessName,
        });
        return res.status(201).json({
            message: 'AccessLevel created successfully',
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
        await AccessLevel.deleteOne({_id: req.params.accessId });
        return res.status(204).json({
            message: 'AccessLevel deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'AccessLevel not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await AccessLevel.updateOne({_id: req.params.accessId},
            {$set: {accessName: req.body.accessName}});
        return res.status(201).json({
            message: 'AccessLevel updated successfully',
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
       const accessLevel = await AccessLevel.findById(req.params.accessId);
       if(!accessLevel) {
           return res.status(404).json({
               message: 'AccessLevel not found',
               success: false,
            })
       }
        return res.status(200).json(accessLevel)
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
            AccessLevel.find({})
                .sort({title: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                AccessLevel.count({})
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