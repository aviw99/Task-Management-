const cron = require('node-cron');
const { pool } = require('../db');

const checkDueDates = async () => {
    try{
        const query  = `
            UPDATE tasks
            SET passed_due_date = true
            WHERE due_date < NOW() AND passed_due_date = false;
        `;
        await pool.query(query);
        const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
        console.log(`Checking due date completed at ${currentDateTime}`);
    }catch (error) {
        console.error('Error checking due dates:', error);
    }
};

cron.schedule(' 0 * * * *', () => {
    checkDueDates();
});

