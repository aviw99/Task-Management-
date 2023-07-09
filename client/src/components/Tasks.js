import  { useState, useEffect, useContext } from 'react';
import {AppContext} from "../App";
import {
    Box, IconButton, Typography, Accordion, AccordionDetails,
    AccordionSummary, Dialog, DialogTitle, DialogContent,
    CircularProgress
}from "@mui/material";
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddTask from "./AddTask";
import {useNavigate} from "react-router-dom";
import UpdateTask from "./UpdateTask";
import SubTasks from "./SubTasks";
import ButtonAppBar from "./Nav";

const Tasks =  (props) => {
    const { token, setToken} = useContext(AppContext);
    const [rerender, setRerender] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [taskAddedSoCloseDialog, setTaskAddedSoCloseDialog] = useState(false);
    const [taskUpdatedSoCloseDialog, setTaskUpdatedSoCloseDialog] = useState(false);
    const [showUpdateTask, setShowUpdateTask] = useState(false);
    const [selectedTaskId ,setSelectedTaskId] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [selectedDueDate, setSelectedDueDate] = useState(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showAddSubTask, setShowAddSubTask] = useState(false);
    const [taskHasSubTask, setTaskHasSubTask] = useState(false);
    const taskInnerStyle = {
        display:'flex',
        justifyContent:'space-between'
    };
    const iconsStyle = {
        display: 'flex',
        flexDirection:'column'
    };
    const navigate = useNavigate();
    const userId = token[0].userId;
    useEffect(() => {
        // const userId = localStorage.getItem('user');
        const cookies = document.cookie;
        console.log(cookies)
        if(!userId){
            navigate('/login')
        }
        const fetchData = async () => {
            try{
                console.log(token)
                const response = await fetch(`/tasks/all/${userId}`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': token[1]
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    setTasks(data)
                    console.log(tasks)
                    // setToken()
                    // console.log('tasks re-rendered');
                    return data
                }else{
                    const errorData = await response.json();
                    console.log('Error', errorData);
                }
            }catch(error){
                console.error('Error occurred', error);
            }
        }
        fetchData()
            .then(data => console.log(data))
    },[rerender]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        flexGrow: 1,
    }));
    const handleDeleteClick = async (taskId) => {
        try{
            const response = await fetch(`tasks/delete/${taskId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            }else{
                const errorData = await response.json();
                console.log('Error deleting task', errorData);
            }
        }catch(error){
            console.error('Error occurred', error);
        }
    }
    const handleCompleteClick = async (taskId) => {
        try{
            const response = await fetch(`tasks/complete/${taskId}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, is_complete: true } : task
                    )
                )
            }else{
                const errorData = await response.json();
                console.log('Error completing task', errorData);
            }
        }catch(error){
            console.error('Error occurred', error);
        }
    }
    const handleUpdateClick = async (taskId, taskName, taskDescription, dueDate) => {
        setSelectedTaskId(taskId);
        setSelectedName(taskName);
        setSelectedDescription(taskDescription);
        setSelectedDueDate(dueDate);
        setShowUpdateDialog(true);
    };
    const showAddTaskForm = () => {
        setShowAddTask(true);
    };
    const hideAddTaskForm = () => {
        setShowAddTask(false);
    };
    const handleTaskAdded = (newTask => {
        setTaskAddedSoCloseDialog(true);
        setShowAddTask(false);
        setTimeout(() => {
            setTaskAddedSoCloseDialog(false)
        },1000);
        setRerender(!rerender);
    });
    const handleTaskUpdated =  (updatedTask => {
        setTaskUpdatedSoCloseDialog(true);
        setShowUpdateTask(false);
        setTimeout(() => {
            setTaskUpdatedSoCloseDialog(false);
        },1000)
        setRerender(!rerender);
    });
    const fetchSubTasks = async (taskId) => {
        try{
            const response = await fetch(`sub/all/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                const data = await response.json();
                return data;
            }else{
                const errorData = await response.json();
                console.log('Error fetching subtasks', errorData);
            }
        }catch(error){
            console.error('Error occurred', error);
        }
    };

    return(
        <Box>
            <ButtonAppBar/>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0.5}
            >
                <div style={{marginTop:'10vh'}}>
                    <IconButton  onClick={showAddTaskForm}>
                        <AddIcon color={'primary'}/>
                    </IconButton>
                </div>
                {
                    tasks.map((task, index) => {
                        return(
                            <Item key={task.id}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography
                                            sx={{ color: 'text.primary' }}
                                        >{task.task_name}</Typography>
                                    </AccordionSummary>
                                    <hr style={{margin:'0 3vh', border:'none',borderBottom:'#ccc solid 1px'}} />
                                    <AccordionDetails style={taskInnerStyle}>
                                        <div>
                                            <div style={{display:'flex'}}>
                                                <div>
                                                    <Typography>Description: <span>{task.task_description}</span></Typography>
                                                    <Typography>Due Date: <span>{task.due_date}</span></Typography>
                                                    {task.is_complete === false  ? <Typography>Completed: False</Typography> : <Typography>Completed: True</Typography>}

                                                </div>
                                                <div style={iconsStyle}>
                                                    <IconButton
                                                        onClick={() => handleCompleteClick(task.id)}
                                                    >
                                                        <DoneIcon color={'primary'}/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleUpdateClick(task.id, task.task_name, task.task_description, task.due_date)}
                                                    >
                                                        <EditIcon
                                                            color={'secondary'}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDeleteClick(task.id)}
                                                    >
                                                        <DeleteIcon
                                                            style={{color: '#b21515'}}
                                                        />
                                                    </IconButton>
                                                </div>

                                            </div>
                                            <SubTasks taskId={task.id}/>

                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Item>
                        )
                    })
                }

                <Dialog open={showAddTask && !taskAddedSoCloseDialog} onClose={hideAddTaskForm}>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                        <AddTask handleTaskAdded={handleTaskAdded}/>
                    </DialogContent>
                </Dialog>
                <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)}>
                    <DialogTitle>Update Task</DialogTitle>
                    <DialogContent>
                        <UpdateTask
                            handleTaskUpdated={handleTaskUpdated}
                            taskId={selectedTaskId}
                            initialTaskName={selectedName}
                            initialTaskDescription={selectedDescription}
                            initialTaskDueDate={selectedDueDate}
                        />
                    </DialogContent>
                </Dialog>
            </Stack>
        </Box>
    )
};

export default Tasks

