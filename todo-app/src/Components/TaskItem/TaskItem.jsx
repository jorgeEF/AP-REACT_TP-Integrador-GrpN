import React, { useState, useEffect } from 'react';
import { Checkbox, Flex, Text, IconButton, Box } from '@chakra-ui/react';
import { DeleteIcon, CalendarIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import '../../assets/Calendar.css';

export const TaskItem = ({ task, onTaskCompleted, onDeleteTask, onAddDueDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [localDueDate, setLocalDueDate] = useState(task.dueDate);  

  useEffect(() => {
    setLocalDueDate(task.dueDate);
  }, [task.dueDate]);  

  const handleCompleteTask = () => {
    const completedDate = !task.completed ? localDueDate : null;
    onTaskCompleted(task.id, !task.completed, completedDate);
    if (!task.completed) {
      setShowCalendar(false);
    }
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {    
    setLocalDueDate(date);
    if (typeof onAddDueDate === 'function') {
      onAddDueDate(task.id, date);
    }

    // Guardar la fecha en el localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTask = { ...task, dueDate: date };
    const updatedIndex = updatedTasks.findIndex((t) => t.id === task.id);

    if (updatedIndex !== -1) {
      updatedTasks[updatedIndex] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));      
    }
    
    setShowCalendar(false);
    window.location.reload();
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" mt={2} p={1} bgColor='rgba(30, 30, 50, 0.3)' borderRadius='5px'>
      <Flex alignItems="center">
        <Checkbox
          mr={2}
          ml={2}
          variant='circular'       
          isChecked={task.completed}
          onChange={handleCompleteTask}
        />
        <Text textDecoration={task.completed ? 'line-through' : 'none'}>
          {task.name}
        </Text>
      </Flex>
      <Flex alignItems="center">
        {task.dueDate ? (
          <Text fontSize="12px" color="teal" mr={2}>
            {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        ) : null}
        {!task.completed && !task.dueDate && (
          <IconButton
            icon={<CalendarIcon />}
            colorScheme="teal"
            size="sm"
            fontSize="18px"
            mr={2}
            ml={2}
            onClick={handleToggleCalendar}
          />
        )}
        {showCalendar && (
          <Box position="absolute" zIndex="10">
            <Calendar onChange={handleDateChange} value={localDueDate} onClickDay={() => setShowCalendar(false)} />
          </Box>
        )}
        <IconButton
          type="button"
          onClick={handleDeleteTask}
          isRound={true}
          variant="solid"
          colorScheme=""
          aria-label="Eliminar"
          size='sm'
          fontSize="12px"
          icon={<DeleteIcon />}
        />
      </Flex>
    </Flex>    
  );
}
