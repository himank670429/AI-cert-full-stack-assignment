const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../DB/todo.json')
module.exports = {
    readJSON : function() {
        try{
            const data = fs.readFileSync(filePath);
            return JSON.parse(data);
        }
        catch(error){
            return [];
        }
    },
    writeJSON : function(updatedData){
        try{
            fs.writeFileSync(filePath, JSON.stringify(updatedData))
        }
        catch(error){
            console.log(error)
        }
    }
}