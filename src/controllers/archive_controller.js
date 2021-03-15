const Pool = require('pg').Pool;
const dbConfig = require('../config/db_config');
const dbQueriesArchive = require('../config/queries/archive');
const field = require('../utilities/field');

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
        : res.json(newReponse('Task without archives', 'Success', []));
    
    } else {
        res.json(newReponse('Error searhing archives', 'Error', { }));
    }
}

const createArchive = async (req, res) => {  
    const { data, taskId } = req.body; 
    const errors = [];

    if(!field.checkFields([ data, taskId ])) {
        errors.push({ text: 'Empty fields' });
    }

    if(errors.length > 0) {
        res.json(newReponse('Errors detected', 'Fail', { errors }));
    
    } else { 
        const archiveData = await pool.query(dbQueriesArchive.createArchive, [ data, taskId ]);
                        
        (archiveData)
        ? res.json(newReponse('Archive created successfully', 'Success', { id: archiveData.archive_ide }))
        : res.json(newReponse('Error create archive', 'Error', { }));
    }
}

const deleteArchiveById = async (req, res) => { 
    const { archiveId } = req.params;
    const data = await pool.query(dbQueriesArchive.deleteArchiveById, [ archiveId ]);
    
    (data)
    ? res.json(newReponse('Archive deleted successfully', 'Success', { }))
    : res.json(newReponse('Error on delete with id', 'Error', { }));
}


// Export
module.exports = { 
    getArchivesByTaskId,
    createArchive,
    deleteArchiveById
}