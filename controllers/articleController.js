const Article = require('../models/articleModel');
const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await Article.create({
            code: req.body.code,
            label: req.body.label,
            breakAlert: req.body.breakAlert,
            category: req.body.category
        });
        return res.status(201).json({
            message: 'Article created successfully',
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
        await Article.deleteOne({_id: req.params.articleId });
        return res.status(204).json({
            message: 'Article deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Article not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Article.updateOne({_id: req.params.articleId},
            {$set: {code: req.body.code,
                    label: req.body.label,
                    breakAlert: req.body.breakAlert,
                    category: req.body.category}});
        return res.status(201).json({
            message: 'Article updated successfully',
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
       const article = await Article.findById(req.params.articleId);
       if(!article) {
           return res.status(404).json({
               message: 'Article not found',
               success: false,
            })
       }
        return res.status(200).json(article);
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
            Article.find({})
                .sort({label: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Article.count({})
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