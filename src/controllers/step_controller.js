const Pool = require('pg').Pool;
const dbConfig = require('../config/db_config');
const dbQueriesStep = require('../config/queries/step');

// Variables
const pool = new Pool(dbConfig);


// Utilities
const newReponse = (message, typeResponse, body) => {
    return {  message, typeResponse, body }
}

const dataToSteps = (rows) => {
    const archives = [];
        
    rows.forEach(element => {
        archives.push({  
            id: element.step_ide,
            description: element.step_des,
            check: element.step_che
        });
    });

    return archives;
}

// Logic
const getStepsByTaskId = async (req, res) => {
    const { taskId } = req.params;
    const data = await pool.query(dbQueriesStep.getStepByTaskId, [ taskId ]);
    
    if(data) { 
        (data.rowCount > 0)
        ? res.json(newReponse('Step found', 'Success', dataToSteps(data.rows)))
        : res.json(newReponse('Task without steps', 'Success', { }));
    
    } else {
        res.json(newReponse('Error searhing steps', 'Error', { }));
    }
}
 

// Export
module.exports = { 
    getStepsByTaskId
}