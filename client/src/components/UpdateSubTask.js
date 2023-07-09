import React, {useState} from "react";
import {TextField, IconButton, Box} from '@mui/material';
import DoneIcon from "@mui/icons-material/Done";

const UpdateSubTask = ({subTaskId, initialSubTaskName, initialSubTaskDescription , handleSubTaskUpdated}) => {
    const [subTaskName, setSubTaskName] = useState(initialSubTaskName || '');
    const [subTaskDescription, setSubaskDescription] = useState(initialSubTaskDescription || '');

    const handleClick = (event) => {
        event.preventDefault();
        updateSubTask(subTaskId, subTaskName, subTaskDescription)
        handleSubTaskUpdated()
    };
    const handleSubTaskNameChange = (event) => {
        setSubTaskName(event.target.value)
    };
    const handleSubTaskDescriptionChange = (event) => {
        setSubaskDescription(event.target.value)
    };
    const updateSubTask = async () => {
        try{
            const response = await fetch(`sub/update/${subTaskId}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "sub_task_name":subTaskName,
                    "sub_task_description":subTaskDescription
                    })
            });
            if(response.ok){
                const data = await response.json();
                console.log('Sub-Task updated', data);
            }else{
                const errorData = await response.json();
                console.log('Error updating sub-task', errorData);
            }
        }catch(error){
            console.error('Unable to update Sub-Task:', error);
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
                label={subTaskName ? null : 'sub-task name'}
                value={subTaskName}
                onChange={handleSubTaskNameChange}
            />
            <TextField
                required
                id="outlined-required"
                label={subTaskDescription ? null: "sub-task description"}
                value={subTaskDescription}
                multiline
                maxRows={3}
                onChange={handleSubTaskDescriptionChange}
            />
            <IconButton variant="contained" onClick={handleClick}>
                <DoneIcon color="secondary" />
            </IconButton>
        </Box>
    )
};

export default UpdateSubTask
