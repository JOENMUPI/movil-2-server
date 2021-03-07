const Pool = require('pg').Pool;
const dbConfig = require('../config/db_config');
const dbQueriesList = require('../config/queries/list');
const field = require('../utilities/field');

// Variables
const pool = new Pool(dbConfig);


// Utilities
const newReponse = (message, typeResponse, body) => {
    return {  message, typeResponse, body }
}

const dataToList = (rows) => {
    const archives = [];
        
    rows.forEach(element => {
        archives.push({  
            id: element.list_ide,
            tittle: element.list_tit,
            background: element.list_img
        });
    });

    return archives;
}

// Logic
const getListByUserId = async (req, res) => {
    const { userId } = req.params;
    const data = await pool.query(dbQueriesList.getListByUserId, [ userId ]);
    
    if(data) { 
        (data.rowCount > 0)
        ? res.json(newReponse('List found', 'Success', dataToList(data.rows)))
        : res.json(newReponse('User without list', 'Success', { }));
    
    } else {
        res.json(newReponse('Error searhing list', 'Error', { }));
    }
}

const createList = async (req, res) => {
    const { tittle, userId, background } = req.body;
    const errors = [];

    if(!field.checkFields([ tittle, userId, background ])) {
        errors.push({ text: 'Empty fields' });
    }

    if(errors.length > 0) {
        res.json(newReponse('Errors detected', 'fail', { errors }));
    
    } else { 
        const data = await pool.query(dbQueriesList.createList, [ tittle, background, userId ]);
                        
        (data)
        ? res.json(newReponse('List created', 'Success', { }))
        : res.json(newReponse('Error create lsit', 'Error', { }));
    }

}

const deleteListById = async (req, res) => {
    const { listId } = req.params;
    const data = await pool.query(dbQueriesList.deleteListById, [ listId ]);
    
    (data)
    ? res.json(newReponse('List deleted successfully', 'Success', { }))
    : res.json(newReponse('Error on delete with id', 'Error', { }));
}


// Export
module.exports = { 
    getListByUserId,
    createList,
    deleteListById
}