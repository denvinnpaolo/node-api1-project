// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();

server.listen(4500, () => {
    console.log('!!!RUNNING ON http://localhost:4500!!!')
})

server.use(express.json())

server.get('/api/users', ( req, res ) => {
    db.find()
        .then( user => {
            res.status(200).json({
                success : true,
                user
            });
        })
        .catch( err => {
            res.status(500).json({
                success : false,
                err
            })
        })
})

server.get('/api/users/:id', ( req, res ) => {
    db.findById(req.params.id)
        .then( user => {
            if(user){
                res.status(200).json(user)
            } else {
                res.status(400).json({ message : 'user not found :('})
            }
        })
        .catch( err => {
            res.status(500).json({
                message : 'error getting user information'
            })
        })
})

server.post('/api/users', ( req, res ) => {
    
    db.insert(req.body)
        .then( userInfo => {
            res.status(201).json({
                success: true,
                userInfo
            })
        })
        .catch( err => {
            res.status(500).json({
                message: 'error finding the user',
                err
            })
        })
})

server.delete('/api/users/:id', ( req, res ) => {
    db.remove(req.params.id)
        .then( count => {
            if(count > 0){
                res.status(200).json({message: 'User has been deleted'});
            } else {
                res.status(404).json({ message: 'User could not be found'});
            }
        })
        .catch( err => {
            res.status(500).json({message: 'ERROR removing the user'});
        })
})