const Pool = require('pg').Pool;
const dbConfig = require('../config/db_config');
const dbQueriesArchive = require('../config/queries/archive');

// Variables
const pool = new Pool(dbConfig);


// Utilities
const newReponse = (message, typeResponse, body) => {
    return {  message, typeResponse, body }
}

const dataToArchives = (rows) => {
    const archives = [];
        
    rows.forEach(element => {
        archives.push({  
            id: element.archive_ide,
            data: element.archive_jso
        });
    });

    return archives;
}


// Logic
const getArchivesByTaskId = async (req, res) => {
    const { taskId } = req.params;
    const data = await pool.query(dbQueriesArchive.getArchiveByTaskId, [ taskId ]);
    
    if(data) { 
        (data.rowCount > 0)
        ? res.json(newReponse('Archives found', 'Success', dataToArchives(data.rows)))
        : res.json(newReponse('Task without archives', 'Success', { }));
    
    } else {
        res.json(newReponse('Error searhing archives', 'Error', { }));
    }
}


// Export
module.exports = { 
    getArchivesByTaskId
}