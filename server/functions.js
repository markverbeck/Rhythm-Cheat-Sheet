const fs = require('fs');

function generateRandomId(){
    return Math.floor(Math.random() * 10000);
  }

  function save(data){
      return new Promise((resolve, reject) => {
          fs.writeFile('./server/data.json', JSON.stringify(data, null, 2),
            (err) => {
              if(err) {
                  reject(err);
            }else{
               resolve(); 
            }
        });
      });
  };

/**
 * Gets all players
 * @param None
 */

function getPlayers(){
    return new Promise((resolve, reject) => {
      fs.readFile('./server/data.json', 'utf8', (err, data) => {
          if(err){
              reject(err);
          }else{
            const json = JSON.parse(data);
            resolve(json);
          }
      })
    })
}

/**
 * Adds new player
 * @param {Object} newPlayer
 */

 async function newPlayer(newPlayer){
   const players = await getPlayers();
   newPlayer.id = generateRandomId();
   newPlayer.scores = {
        Whole: {name: "Whole", score: 0},
        Half: {name: "Half", score: 0},
        Quarter: {name: "Quarter", score: 0},
        Eighth: {name: "Eighth", score: 0},
        Sixteenth: {name: "Sixteenth", score: 0},
        Triplet: {name: "Triplet", score: 0},
    }
    players.players.push(newPlayer);
    await save(players);
    return newPlayer
 }

 /**
 * Get Specific player
 * @param {number} id
 */

async function getPlayer(id){
  const players = await getPlayers();
  return players.players.find(player => player.id == id);
}

/**
 * Update Score
 * @param {number} id
 * @param {string} note
 * @param {string} score
 */
async function updateScore(id, note, newScore){
    const players = await getPlayers();
    const player = players.players.find(player => player.id == id);
    player.scores[note].score = newScore;
    await save(players);
}

/**
 * Change Password
 * @param {string} id
 * @param {string} password
 */
async function changePassword(id, password){
    const players = await getPlayers();
    const player = players.players.find(player => player.id == id);
    player.password = password;
    await save(players);
}

module.exports = {
    getPlayers,
    newPlayer,
    getPlayer,
    updateScore,
    changePassword
}