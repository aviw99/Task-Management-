import React, { useState } from 'react';
import {TextField, IconButton, Box} from '@mui/material';
import DoneIcon from "@mui/icons-material/Done";
const UpdateTask = ( {taskId, initialTaskName, initialTaskDescription, handleTaskUpdated}) => {

    const [taskName, setTaskName] = useState(initialTaskName || '');
    const [taskDescription, setTaskDescription] = useState(initialTaskDescription || '');

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };
    const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };
    const handleClick = (event) => {
        event.preventDefault();
        updateTask(taskId, taskName, taskDescription)
        handleTaskUpdated()
    };
    const updateTask = async (taskId, taskName, taskDescription) => {
        try{
            const response = await fetch(`tasks/update/${taskId}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    'task_name':taskName,
                    'task_description':taskDescription
                })
            });
            if(response.ok){
                const data = await response.json();
                console.log('Task updated', data);
            }else{
                const errorData = await response.json();
                console.log('Error updating task', errorData);
            }
        }catch(error){
            console.error('Unable to update Task:', error);
        }
    };
    return(
        <Box
            component={'form'}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                required
                id="outlined-required"
                label={taskName ? null : 'task name'}
                value={taskName}
                onChange={handleTaskNameChange}
            />
            <TextField
                required
                id="outlined-required"
                label={taskDescription ? null: "task description"}
                value={taskDescription}
                multiline
                maxRows={3}
                onChange={handleTaskDescriptionChange}
            />
            <IconButton variant="contained" onClick={handleClick}>
                <DoneIcon color="secondary" />
            </IconButton>
        </Box>
    )
}

export default UpdateTask
