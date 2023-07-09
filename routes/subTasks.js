const express = require('express');
const { pool } = require('../db');
const router = express.Router();

router.get('/all', async(req,res) => {
    try{
        const query = 'SELECT * FROM sub_tasks';
        const {rows} = await pool.query(query);
        res.json(rows);
    }catch (error) {
        console.error('Error retrieving sub_tasks:', error);
        res.status(500).json({error: 'An error occurred'});
    }
});

router.get('/all/:task_id', async(req, res) => {
    try{
        const {task_id} = req.params;
        const query = 'SELECT * FROM sub_tasks WHERE task_id = $1';
        const {rows} = await pool.query(query, [task_id]);
        res.json(rows);
    }catch (error) {
        console.error('Error retrieving sub_tasks:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/create', async (req, res) => {
    try{
        const {task_id, sub_task_name, sub_task_description} = req.body;
        const query = `
            INSERT INTO sub_tasks (task_id, sub_task_name, sub_task_description)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [task_id, sub_task_name, sub_task_description];
        const {rows} = await pool.query(query, values);
        res.json(rows);
    }catch(error){
        console.error('Error creating sub_task:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});


router.delete('/delete/:id', async(req, res) => {
    try{
        const subTaskId = req.params.id;
        const query = 'DELETE FROM sub_tasks WHERE  id = $1';
        const {rowCount} = await pool.query(query, [subTaskId]);
        if(rowCount === 0 ){
            return res.status(404).json({error: 'Sub task not found'});
        }
        res.json({message: 'Sub task deleted successfully'});
    }catch(error){
        console.error('Error deleting sub task:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        const sub_task_id = req.params.id;
        const {sub_task_name, sub_task_description} = req.body;
        const query = `
            UPDATE sub_tasks
            SET
                sub_task_name = COALESCE($1, sub_task_name),
                sub_task_description = COALESCE($2, sub_task_description)
            WHERE id = $3
            RETURNING *
        `
        const values = [sub_task_name, sub_task_description, sub_task_id];
        const {rows} = await pool.query(query, values);
        res.json(rows);
    }catch(error){
        console.error('Error updating sub task:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});

router.put('/complete/:id', async(req, res) => {
    try{
        const sub_task_id = req.params.id;
        const query = `
            UPDATE sub_tasks
            SET
                is_complete = true
            WHERE id = $1
            RETURNING *
        `;
        const {rows} = await pool.query(query, [sub_task_id]);
        res.json(rows);
    }catch (error) {
        console.error('Error completing sub task:', error);
        res.status(500).json({ error: 'An error occurred', message: error.message });
    }
});








module.exports = router;
