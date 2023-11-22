import React, { useState } from 'react';
import { Checkbox, Flex, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon, CalendarIcon } from '@chakra-ui/icons';

export const TaskItem = ({ task, onTaskCompleted, onDeleteTask }) => {
  const [showCalendar, setShowCalendar] = useState(false);  

  const handleCompleteTask = () => {
    onTaskCompleted(task.id, !task.completed);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
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