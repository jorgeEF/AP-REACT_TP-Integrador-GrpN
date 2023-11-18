// TaskItem.js
import React from 'react';
import { Checkbox, Box, Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export const TaskItem = ({ task, onTaskCompleted, onDeleteTask }) => {
  const handleCompleteTask = () => {
    onTaskCompleted(task.id, !task.completed);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  return (    
      <Flex alignItems="center" justifyContent="space-between" mt={2}>
        <Flex alignItems="center">
            <Checkbox
            mr={2}
            isChecked={task.completed}
            onChange={handleCompleteTask}
            />
            <Text textDecoration={task.completed ? 'line-through' : 'none'}>
            {task.name}
            </Text>
        </Flex>
        {/* <Button ml={2} colorScheme="red" onClick={handleDeleteTask}>
            Eliminar
        </Button> */}
        <IconButton
          type="button"
          onClick={handleDeleteTask}
          isRound={true}          
          variant="solid"
          colorScheme=""
          aria-label="Agregar"
          size='sm'
          fontSize="12px"
          icon={<DeleteIcon />}
          />
    </Flex>
  );
};
