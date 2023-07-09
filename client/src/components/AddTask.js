import React, {useContext, useState} from 'react';
import {Box, TextField, IconButton} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import {AppContext} from "../App";

const AddTask = ( {handleTaskAdded}) => {
    const { token, setToken} = useContext(AppContext);
    const [time, setTime] = useState(dayjs());
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    }
    const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    }
    const handleClick = (event) => {
        event.preventDefault()
        const dueDate = time.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        postTask(taskName, taskDescription, dueDate)
        handleTaskAdded();
        }

    const postTask = async (taskName, taskDescription, dueDate) => {
        const userId = token[0].userId;
        // const userId = localStorage.getItem('user');
        try{
            const response = await fetch('tasks/create/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    'task_name':taskName,
                    'task_description':taskDescription,
                    'due_date':dueDate,
                    'user_id':userId
                })
            });
            if(response.ok){
                const data = await response.json();
                console.log('Task added', data);
            }else{
                const errorData = await response.json();
                console.log('Error posting task', errorData);
            }
        }catch(error){
            console.error('Unable to post Task:', error);
        }
    }
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
                label="task name"
                onChange={handleTaskNameChange}
            />
            <TextField
                required
                id="outlined-required"
                label="task description"
                multiline
                maxRows={3}
                onChange={handleTaskDescriptionChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                        label="Due Date"
                        value={time}
                        onChange={(newValue) => setTime(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <IconButton variant="contained" onClick={handleClick}>
                <AddIcon color="primary" />
            </IconButton>
        </Box>
    )
}

export default AddTask