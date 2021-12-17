const StatutCommande = require('../models/statutCommandModel');

const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await StatutCommande.create({
            name: req.body.name,
        });
        return res.status(201).json({
            message: 'StatutCommande created successfully',
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
        await StatutCommande.deleteOne({_id: req.params.statusId });
        return res.status(204).json({
            message: 'StatutCommande deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'StatutCommande not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await StatutCommande.updateOne({_id: req.params.statusId},
            {$set: {name: req.body.name}});
        return res.status(201).json({
            message: 'StatutCommande updated successfully',
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
       const status = await StatutCommande.findById(req.params.statusId);
       if(!status) {
           return res.status(404).json({
               message: 'StatutCommande not found',
               success: false,
            })
       }
        return res.status(200).json(status)
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
            StatutCommande.find({})
                .sort({name: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                StatutCommande.count({})
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