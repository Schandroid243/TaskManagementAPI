const User = require('../models/userModel');
const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await User.create({
            ...req.body
        });
        return res.status(201).json({
            message: 'User created successfully',
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
        await User.deleteOne({_id: req.params.userId });
        return res.status(204).json({
            message: 'User deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'User not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
       const user = await User.updateOne({_id: req.params.userId},
        {$set: {name: req.body.name,
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               adress: req.body.adress,
               phone: req.body.phone,
               genre: req.body.genre,
               role: req.body.role,
               email: req.body.email,
               password: req.body.password}});
       console.log(user);
        return res.status(201).json({
            message: 'User updated successfully',
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
       const user = await User.findById(req.params.userId);
       if(!user) {
           return res.status(404).json({
               message: 'User not found',
               success: false,
            })
       }
        return res.status(200).json(user)
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
            User.find({})
                .sort({name: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                User.count({})
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