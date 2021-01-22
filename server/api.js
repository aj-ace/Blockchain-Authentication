const express = require('express');
const router = express.Router();
const Note = require('./model');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string().required(),

    content: Joi.string().required(),
    
    token: Joi.string().required()
})

const schemaUpdate = Joi.object({
    title: Joi.string().required(),

    content: Joi.string().required(),
    
    token: Joi.string().required(),

    _id: Joi.string().required()
})

const schemaDelete = Joi.object({    
    token: Joi.string().required(),

    _id: Joi.string().required()
})

router.put('/', function(req, res, next){
    Note.find({
         token: req.body.token
        }).select("-__v -token")
        .then(notes =>{
            res.json(notes);
        }).catch(err => {
            res.status(409);
            next(err)
        });

});

router.post('/', function(req, res, next){
    const result = schema.validate(req.body);
    if(!result.error){
        const note = { ...req.body  };
        Note.create(note).then(function(notes){
            res.json({ 
                _id: notes._id,
                title: notes.title,
                content: notes.content,
            });
        }).catch(err => {
            res.status(409);
            next(err)
        });
                
    } else {
        const error = new Error('Validation failed'); 
        res.status(409);
        next(error);
    }
      
});

router.patch('/', function(req, res, next){
    const result = schemaUpdate.validate(req.body);
    if(!result.error){
        const note = { ...req.body };
        Note.findOneAndUpdate({_id: req.body._id, token: req.body.token }, note)
        .then(function(){
            Note.findOne({_id: req.body._id, token: req.body.token})
            .select("-__v -token")
            .then(function(notes){
                res.json(notes);
            }).catch(err => {
                res.status(409);
                next(err)
            });
        }).catch(err => {
            res.status(409);
            next(err)
        });
    }else {
        const error = new Error('Validation failed'); 
        res.status(409);
        next(error);
    }
});

router.delete('/', function(req, res, next){
    const result = schemaDelete.validate(req.body);
    if(!result.error){
        Note.findOneAndRemove({_id: req.body._id, token: req.body.token })
        .select("-__v -token")
        .then(function(note){
            if(note){
                res.json(note);
            }else{
                const error = new Error('delete request failed'); 
                res.status(409);
                next(error);
            }
        }).catch(err => next(err))
    }else {
        const error = new Error('Validation failed'); 
        res.status(409);
        next(error);
    }
});

module.exports = router;
