import React, {useContext, useState} from 'react';
import {Box, TextField, IconButton, Typography} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import AddIcon from '@mui/icons-material/Add';
import {AppContext} from "../App";

const AddSubTask = ({handleSubTaskAdded, id, taskId}) => {
    const [task_id, setTask_id] = useState('');
    const [subTaskName, setSubTaskName] = useState('');
    const [subTaskDescription, setSubTAskDescription] = useState('')
    const handleClick = (event) => {
        event.preventDefault()
        // postSubTask(taskId, subTaskName, subTaskDescription)
        setTask_id(taskId)
        handleSubTaskAdded()
    };
    const handleSubTaskNameChange = (event) => {
        setSubTaskName(event.target.value)
    };
    const handleSubTaskDescriptionChange = (event) => {
        setSubTAskDescription(event.target.value)
    };
    // const postSubTask = async(taskId, name, description) => {
    //     try{
    //         const response = await fetch(`sub/create`,{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify({
    //
    //             })
    //         })
    //     }catch(error){
    //         console.error('Unable to post Sub-Task:', error);
    //     }
    // };
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
                label="sub-task name"
                onChange={handleSubTaskNameChange}
            />
            <TextField
                required
                id="outlined-required"
                label="sub-task description"
                multiline
                maxRows={3}
                onChange={handleSubTaskDescriptionChange}
            />
            <Typography >{task_id}</Typography>
            <IconButton onClick={() => handleClick(taskId)}>
                <AddIcon color={'primary'}/>
            </IconButton>
        </Box>
    )
};


export default AddSubTask
