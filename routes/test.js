const axios = require('axios')
const Promise = require('bluebird')


module.exports = {
    getRecipes(req, res) {
        const url = "https://jsonplaceholder.typicode.com/todos"
  
        axios
        .get(url)
        .then(response => {
            let result = JSON.parse(response)
          res.send(result)
        })
        .catch(err => {
          console.log(err)
          res.send({ err }) // <= send error
        })
    }
  }