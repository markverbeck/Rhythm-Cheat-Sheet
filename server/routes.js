const express = require('express');
const router = express.Router();
const functions = require('./functions');



function asyncHandler(cb){
    return async (req, res, next) => {
      try{
        await cb(req, res, next);
      }catch(err){
        next(err);
      }
    }
  }

// get all players
router.get('/hjkghkhjg86tvg/vhjuyrer678jyt/cfgh567kj', asyncHandler( async (req, res, next) => {
    const players = await functions.getPlayers();
    res.json(players);
}))

// get specific player
router.get('/player/:id', asyncHandler(async (req, res, next) => {
    const player = await functions.getPlayer(req.params.id);
    if(player){
        res.json(player)
    }else{
        res.status(404).json({message: "player can't be found"});
    }
}));

// Create new player. 
router.post('/', asyncHandler( async (req, res, next) => {
    if(req.body.name && req.body.password && req.body.fav && req.body.answer){
        const player = await functions.newPlayer({
            name: req.body.name,
            password: req.body.password,
            fav: req.body.fav,
            answer: req.body.answer
        });
        res.status(201).cookie('loggedIn', true).cookie('id', player.id).json(player);
    }else{
      res.status(400).json({message: "Please add routerropriate information to create a new player."})
    }
}))

// Update score.
router.put('/player/:id', asyncHandler(async (req, res, next) => {
    console.log(req.body);
    if(req.params.id && req.body.note && req.body.score){
        const score = await functions.updateScore(req.params.id, req.body.note, req.body.score);
        res.status(204).end();
    }else{
        res.status(400).json({message: "please enter correct information."})
    }
    
}));

// Player sign in
router.post("/sign-in", asyncHandler( async (req, res, next) => {
    console.log(req.cookies);
 const players = await functions.getPlayers();
 const player = players.players.find(player => player.name == req.body.name);
  if(player){
      if(player.password == req.body.password){
          res.cookie('loggedIn', true).cookie('id', player.id).json({message: "You have logged in."});
      }else{
        res.status(400).json({message: "Incorrect password"});
      }
  }else{
    res.status(400).json({message: "Username couldn't be found."})
  }
}));

// Player sign-out
router.post("/sign-out", asyncHandler( async (req, res, next) => {
    res.clearCookie('loggedIn').clearCookie('id').json({message: "You have signed out"});
}));

// Check user name pre password change
router.get('/change-password/:username', asyncHandler(async (req, res, next) => {
    const players = await functions.getPlayers();
    const player = players.players.find(player => player.name == req.params.username);
    if(player){
        res.json(player);
    }else{
        res.status(404).json({message: "player can't be found"});
    }
}))

// Change password
router.post("/change-password", asyncHandler(async (req, res, next) => {
    const players = await functions.getPlayers();
    const player = players.players.find(player => player.id == req.body.id);
    if(player){
        const updatePassword = await functions.changePassword(req.body.id, req.body.password);
        res.status(204).end();
    }else{
        res.status(404).json({message: "player can't be found"});
    }
}))
module.exports = router;