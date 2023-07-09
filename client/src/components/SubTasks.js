import {
    Box,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    DialogTitle,
    DialogContent, Dialog
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import UpdateTask from "./UpdateTask";
import UpdateSubTask from "./UpdateSubTask";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";

const SubTasks = (props) => {
    const iconsStyle = {
        display: 'flex',
        flexDirection: 'column'
    };
    const [rerender, setRerender] = useState(true);
    const [subTasks, setSubTasks] = useState([]);
    const [selectedSubTaskId ,setSelectedSubTaskId] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [subTaskUpdatedSoCloseDialog, setSubTaskUpdatedSoCloseDialog] = useState(false);
    const [showUpdateSubTask, setShowUpdateSubTask] = useState(false);
    const [showAddSubTask, setShowAddSubTask] = useState(false);
    const [ subTaskAddedSoCloseDialog, setSubTaskAddedSoCloseDialog] = useState(false);
    const [taskId, setTaskId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`sub/all/${props.taskId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSubTasks(data);
                } else {
                    const errorData = await response.json();
                    console.log('Error fetching subtasks', errorData);
                }
            } catch (error) {
                console.error('Error occurred', error);
            }
        };

        fetchData();
    }, [props.taskId]);
    const handleSubTaskNameChange = () => {};
    const handleCompleteClick = async (id) => {
        try{
            const response = await fetch(`sub/complete/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                setSubTasks((prevSubTasks) =>
                    prevSubTasks.map((subTask) =>
                        subTask.id === id ? { ...subTask, is_complete: true } : subTask
                    )
                )
            }
            else{
                const errorData = await response.json();
                console.log('Error completing sub-task', errorData);
            }
        }catch(error){
            console.error('Error occurred', error);
        }
    };
    const handleDeleteClick = async (id) => {
        try{
            const response = await fetch(`sub/delete/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                setSubTasks(prevSubTasks => prevSubTasks.filter(subTask => subTask.id !== id));
            }else{
                const errorData = await response.json();
                console.log('Error deleting sub-task', errorData);
            }
        }catch(error){
            console.error('Error occurred', error);
        }
    };
    const handleUpdateClick = async (id, name, description) => {
        setSelectedSubTaskId(id)
        setSelectedName(name)
        setSelectedDescription(description)
        setShowUpdateDialog(true)
    };
    const handleSubTaskUpdated = () => {
        setSubTaskUpdatedSoCloseDialog(true)
        setShowUpdateSubTask(false);
        setTimeout(() => {
            setSubTaskUpdatedSoCloseDialog(false)
        },1000)
        setRerender(!rerender)
    };
    const showAddSubTaskForm = (id) => {
        setShowAddSubTask(true)
        setTaskId(id)
    };
    const hideAddSubTaskForm = () => {
        setShowAddSubTask(false);
    };
    const handleSubTaskAdded = (newSubTask => {
        setSubTaskAddedSoCloseDialog(true);
        setShowAddSubTask(false);
        setTimeout(() => {
            setSubTaskAddedSoCloseDialog(false)
        },1000);
        setRerender(!rerender);
    });
    return (
        <div>
            <Box
                component={'form'}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0.5}
                >
                    {subTasks.map((subTask, index) => (
                        <div>
                            <Accordion key={subTask.id}  style={{maxWidth:'10vw'}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Typography>{subTask.sub_task_name}</Typography>
                                </AccordionSummary>
                                <hr style={{margin:'0 3vh', border:'none',borderBottom:'#ccc solid 1px'}} />
                                <AccordionDetails style={{display:'flex',justifyContent:'space-between'}}>
                                    <div>
                                        <Typography>Description: <span>{subTask.sub_task_description}</span></Typography>
                                        {subTask.is_complete === false  ? <Typography>Completed: False</Typography> : <Typography>Completed: True</Typography>}
                                    </div>
                                    <div>
                                        <div style={iconsStyle}>
                                            <IconButton
                                                onClick={() => handleCompleteClick(subTask.id)}
                                            >
                                                <DoneIcon color={'primary'}/>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleUpdateClick(subTask.id, subTask.task_name, subTask.task_description)}
                                            >
                                                <EditIcon
                                                    color={'secondary'}
                                                />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeleteClick(subTask.id)}
                                            >
                                                <DeleteIcon
                                                    style={{color: '#b21515'}}
                                                />
                                            </IconButton>
                                        </div>
                                    </div>
                                </AccordionDetails>
                                <Dialog open={showAddSubTask && !subTaskAddedSoCloseDialog} onClose={hideAddSubTaskForm}>
                                    <DialogTitle>Add Sub-Task</DialogTitle>
                                    <DialogContent>

                                        <AddSubTask
                                            handleSubTaskAdded={handleSubTaskAdded}
                                            id={subTask.id}
                                            taskid={subTask.task_id}
                                        />

                                    </DialogContent>
                                </Dialog>
                            </Accordion>

                        </div>
                    )
                    )}
                </Stack>
            </Box>
            <IconButton  onClick={showAddSubTaskForm}>
                <AddIcon color={'primary'}/>
            </IconButton>
            {/*<Dialog open={showAddSubTask && !subTaskAddedSoCloseDialog} onClose={hideAddSubTaskForm}>*/}
            {/*    <DialogTitle>Add Sub-Task</DialogTitle>*/}
            {/*    <DialogContent>*/}

            {/*            <AddSubTask*/}
            {/*                handleSubTaskAdded={handleSubTaskAdded}*/}
            {/*                // id={subTask.id}*/}
            {/*            />*/}

            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
            <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)}>
                <DialogTitle>Update Sub-Task</DialogTitle>
                <DialogContent>
                    <UpdateSubTask
                        handleSubTaskUpdated={handleSubTaskUpdated}
                        subTaskId={selectedSubTaskId}
                        initialSubTaskName={selectedName}
                        initialSubTaskDescription={selectedDescription}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubTasks;
