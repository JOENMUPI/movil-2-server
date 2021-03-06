const table = 'task';

module.exports = {
    // Insert
    createTask: `INSERT INTO ${ table } 
    (task_tit, task_des, task_pin, task_che, task_hou_exp, task_dat_exp, task_dat_cre, task_pos, list_ide) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING task_ide`,
    
    
    // Select
    getAllTasks: `SELECT * FROM ${ table }`,
    getTaskById: `SELECT * FROM ${ table } WHERE task_ide = $1`,
    getTaskByListId: `SELECT * FROM ${ table } WHERE list_ide = $1`,
    
    
    // Update
    updateTaskById: `UPDATE ${ table } SET 
    task_tit = $1, task_des = $2, task_pin = $3, task_che = $4, task_hou_exp = $5,  task_dat_exp = $6, task_pos = $7 
    WHERE task_ide = $8`,

    // Delete
    deleteTaskById: `DELETE FROM ${ table } WHERE task_ide = $1`
};