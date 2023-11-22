import React, { useState } from 'react';
import { Checkbox, Flex, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon, CalendarIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const TaskItem = ({ task, onTaskCompleted, onDeleteTask, onAddDueDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dueDate, setDueDate] = useState(task.dueDate || new Date());

  const handleCompleteTask = () => {
    onTaskCompleted(task.id, !task.completed);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  const handleAddDueDate = () => {
    onAddDueDate(task.id, dueDate);
    setShowCalendar(false);
  };

  const isToday = (someDate) => {
    const today = new Date();
    const date = new Date(someDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

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
        <IconButton
          icon={<CalendarIcon />}
          colorScheme="teal"
          size="sm"
          fontSize="18px"
          mr={2}
          ml={2}
          onClick={() => setShowCalendar(!showCalendar)}
        />
        {showCalendar && (
          <Flex flexDirection="column" alignItems="center" color="black" mt="10px">
            <Calendar onChange={(date) => setDueDate(date)} value={dueDate} minDate={new Date()} />
            <IconButton
              type="button"
              variant="solid"
              colorScheme="teal"
              size="sm"
              fontSize="14px"
              onClick={handleAddDueDate}
              mt={2}
            >
              Agregar
            </IconButton>
          </Flex>
        )}
        {task.dueDate && (
          <Flex alignItems="center">
            <Text ml={2} mr={2} color={isToday(task.dueDate) ? 'red' : 'inherit'} fontSize={isToday(task.dueDate) ? '18px' : 'inherit'}>
              {isToday(task.dueDate) ? 'Due today' : new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </Flex>
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
};

/* import React from 'react';
import { Checkbox, Flex, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon, CalendarIcon } from '@chakra-ui/icons';

export const TaskItem = ({ task, onTaskCompleted, onDeleteTask }) => {
  const handleCompleteTask = () => {
    onTaskCompleted(task.id, !task.completed);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  const isToday = (someDate) => {
    const today = new Date();
    const date = new Date(someDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

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
        {task.dueDate && (
          <>
            <CalendarIcon color="teal.500" boxSize={4} mr={2} ml={10} />
            <Text ml={2} mr={2}  color={isToday(task.dueDate)  ? 'red' : 'inherit'}fontSize={isToday(task.dueDate) ? '18px' : 'inherit'}>
              {isToday(task.dueDate) 
                ? 'Due today'
                : new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </>
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
};
 */