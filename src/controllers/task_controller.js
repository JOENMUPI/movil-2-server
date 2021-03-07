const Pool = require('pg').Pool;
const dbConfig = require('../config/db_config');
const dbQueriesTask = require('../config/queries/task');

// Variables
const pool = new Pool(dbConfig);


// Utilities
const newReponse = (message, typeResponse, body) => {
    return {  message, typeResponse, body }
}

const dataToTask = (rows) => {
    const archives = [];
        
    rows.forEach(element => {
        archives.push({  
            id: element.task_ide,
            tittle: element.task_tit,
            dateCreate: element.task_dat_cre,
            dateExpiration: element.task_dat_exp,
            hourExpiration: element.task_hou_exp,
            note: element.task_des,
            priority: element.task_pin,
            check: element.task_che,
            position: element.task_pos, 
            steps: [],
            archives: []
        });
    });

    return archives;
}

// Logic
const getTaskByListId = async (req, res) => {
    const { listId } = req.params;
    const data = await pool.query(dbQueriesTask.getTaskByListId, [ listId ]);
    
    if(data) { 
        (data.rowCount > 0)
        ? res.json(newReponse('Task found', 'Success', dataTotask(data.rows)))
        : res.json(newReponse('List without task', 'Success', { }));
    
    } else {
        res.json(newReponse('Error searhing task', 'Error', { }));
    }
}
 

// Export
module.exports = { 
    getTaskByListId
}