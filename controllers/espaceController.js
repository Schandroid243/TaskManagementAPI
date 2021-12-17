const Espace = require('../models/espaceModel');
const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await Espace.create({
            espaceName: req.body.espaceName,
            tableName: req.body.tableName,
        });
        return res.status(201).json({
            message: 'Espace created successfully',
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
        await Espace.deleteOne({_id: req.params.espaceId });
        return res.status(204).json({
            message: 'Espace deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Espace not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Espace.updateOne({_id: req.params.espaceId},
            {$set: {espaceName: req.body.espaceName,
                    tableName: req.body.tableName}});
        return res.status(201).json({
            message: 'Espace updated successfully',
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
       const espace = await Espace.findById(req.params.espaceId);
       if(!espace) {
           return res.status(404).json({
               message: 'Espace not found',
               success: false,
            })
       }
        return res.status(200).json(espace)
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
            Espace.find({})
                .sort({espaceName: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Espace.count({})
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