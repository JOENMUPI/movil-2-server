const table = 'step';

module.exports = {
    // Insert
    createStep: `INSERT INTO ${ table } (step_des, step_che, task_ide) VALUES ($1, $2, $3)`,
    
    
    // Select
    getAllSteps: `SELECT * FROM ${ table }`,
    getStepById: `SELECT * FROM ${ table } WHERE step_ide = $1`,
    getStepByDescription: `SELECT * FROM ${ table } WHERE step_des = $1`,
    
    
    // Update
    updateStepById: `UPDATE ${ table } SET step_des = $1, step_che = $2 WHERE step_ide = $3`,
    

    // Delete
    deleteStepById: `DELETE FROM ${ table } WHERE step_ide = $1`
};