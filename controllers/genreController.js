const Genre = require('../models/genreModel');
const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await Genre.create({
            name: req.body.name,
        });
        return res.status(201).json({
            message: 'Genre created successfully',
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
        await Genre.deleteOne({_id: req.params.genreId });
        return res.status(204).json({
            message: 'Genre deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Genre not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Genre.updateOne({_id: req.params.genreId},
            {$set: {name: req.body.name}});
        return res.status(201).json({
            message: 'Genre updated successfully',
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
       const genre = await Genre.findById(req.params.genreId);
       if(!genre) {
           return res.status(404).json({
               message: 'Genre not found',
               success: false,
            })
       }
        return res.status(200).json(genre)
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
            Genre.find({})
                .sort({name: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Genre.count({})
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