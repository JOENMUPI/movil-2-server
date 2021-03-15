const Pool = require('pg').Pool;
const dbConfig = require('../config/db_config');
const dbQueriesTask = require('../config/queries/task');
const field = require('../utilities/field');


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
        ? res.json(newReponse('Task found', 'Success', dataToTask(data.rows)))
        : res.json(newReponse('List without task', 'Success', []));
    
    } else {
        res.json(newReponse('Error searhing task', 'Error', { }));
    }
}

const createTask = async (req, res) => {
    const { tittle, listId, position } = req.body;
    const errors = [];

    if(!field.checkFields([ tittle, listId, position ])) {
        errors.push({ text: 'Empty fields' });
    }

    if(errors.length > 0) {
        res.json(newReponse('Errors detected', 'Fail', { errors }));
    
    } else { 
        const data = await pool.query(dbQueriesTask.createTask, [ tittle, false, false, new Date(),  position, listId ]);
                        
        (data)
        ? res.json(newReponse('Task created', 'Success', { id: data.rows[0].task_ide }))
        : res.json(newReponse('Error create task', 'Error', { }));
    }
}

const updateTasTittlekById = async (req, res) => { 
    const { tittle, id } = req.body; 
    const errors = [];

    if(!field.checkFields([ tittle ])) {
        errors.push({ text: 'Empty fields' });
    }

    if(errors.length > 0) {
        res.json(newReponse('Errors detected', 'Fail', { errors }));
    
    } else { 
        const data = await pool.query(dbQueriesTask.updateTaskTittleById, [ tittle, id ]);
                        
        (data)
        ? res.json(newReponse('Task updated', 'Success', { }))
        : res.json(newReponse('Error update task', 'Error', { }));
    }
}

const updateTaskFieldById = async (req, res) => {  
    const { id, field, type } = req.body; 
    const errors = [];

    /*if(!field.checkFields([ id, field, type ])) {
        errors.push({ text: 'Empty fields' });
    }*/

    if(errors.length > 0) {
        res.json(newReponse('Errors detected', 'Fail', { errors }));
    
    } else { 
        let data;
 
        switch (type) {
            case 'tittle':
                data = await pool.query(dbQueriesTask.updateTaskTittleById, [ field, id ]);
                break;

            case 'note': 
                data = await pool.query(dbQueriesTask.updateTaskNoteById, [ field, id ]);
                break;

            case 'date':
                data = await pool.query(dbQueriesTask.updateTaskDateExpById, [ field, id ]); 
                break;

            case 'time':
                data = await pool.query(dbQueriesTask.updateTaskHourExpById, [ field, id ]); 
                break;

            default:
                res.json(newReponse('Type not found', 'Error', { }))
                break;
        }
                        
        (data)
        ? res.json(newReponse('Field updated successfully', 'Success', { }))
        : res.json(newReponse('Error update field', 'Error', { }));
    }
}

const deleteTaskById = async (req, res) => {
    const { taskId } = req.params;
    const data = await pool.query(dbQueriesTask.deleteTaskById, [ taskId ]);
    
    (data)
    ? res.json(newReponse('Task deleted successfully', 'Success', { }))
    : res.json(newReponse('Error on delete with id', 'Error', { }));
}
 

// Export
module.exports = { 
    getTaskByListId,
    createTask,
    updateTasTittlekById,
    updateTaskFieldById,
    deleteTaskById
}