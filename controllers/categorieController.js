const Category = require('../models/categorieModel');
const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await Category.create({
            name: req.body.name,
        });
        return res.status(201).json({
            message: 'Category created successfully',
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
        await Category.deleteOne({_id: req.params.categoryId });
        return res.status(204).json({
            message: 'Category deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Category not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Category.updateOne({_id: req.params.categoryId},
            {$set: {name: req.body.name}});
        return res.status(201).json({
            message: 'Category updated successfully',
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
       const category = await Category.findById(req.params.categoryId);
       if(!category) {
           return res.status(404).json({
               message: 'Category not found',
               success: false,
            })
       }
        return res.status(200).json(category)
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
            Category.find({})
                .sort({name: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Category.count({})
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