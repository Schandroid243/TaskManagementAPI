const Menu = require('../models/menuModel');

const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await Menu.create({
            articleName: req.body.articleName,
            categorieArticle: req.body.categorieArticle,
            espaceName: req.body.espaceName,
        });
        return res.status(201).json({
            message: 'Menu created successfully',
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
        await Menu.deleteOne({_id: req.params.menuId });
        return res.status(204).json({
            message: 'Menu deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Menu not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Menu.updateOne({_id: req.params.menuId},
            {$set: {articleName: req.body.articleName,
                    categorieArticle: req.body.categorieArticle,
                    espaceName: req.body.espaceName,}});
        return res.status(201).json({
            message: 'Menu updated successfully',
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
       const menu = await Menu.findById(req.params.menuId);
       if(!menu) {
           return res.status(404).json({
               message: 'Menu not found',
               success: false,
            })
       }
        return res.status(200).json(menu)
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
            Menu.find({})
                .sort({name: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Menu.count({})
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