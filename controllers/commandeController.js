const Commande = require('../models/commandeModel');
const paginate = require('express-paginate');

const create = async (req, res) => {
    try{
         await Commande.create({
            ...req.body
        });
        return res.status(201).json({
            message: 'Commande created successfully',
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
        await Commande.deleteOne({_id: req.params.commandeId });
        return res.status(204).json({
            message: 'Commande deleted successfully',
            success: true,
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Commande not deleted',
            success: true,
        })
    }
}

const update = async (req, res) => {
    try{
        await Commande.updateOne({_id: req.params.commandeId},
            {$set: {numCommands: req.body.numCommands,
                    espaceName: req.body.espaceName,
                    montant: req.body.montant,
                    statutCommande: req.body.statutCommande,
                    numFacturations: req.body.numFacturations,
                    numClients: req.body.numClients,
                    serverName: req.body.serverName}});
        return res.status(201).json({
            message: 'Commande updated successfully',
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
       const commande = await Commande.findById(req.params.commandeId);
       if(!commande) {
           return res.status(404).json({
               message: 'Commande not found',
               success: false,
            })
       }
        return res.status(200).json(commande)
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
            Commande.find({})
                .sort({numCommands: 'asc'})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Commande.count({})
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