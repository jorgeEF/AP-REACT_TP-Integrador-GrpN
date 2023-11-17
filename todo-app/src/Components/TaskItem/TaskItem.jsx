// TaskItem.js
import React from 'react';
import { Checkbox, Box, Text, Button, Flex } from '@chakra-ui/react';

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
        <Button ml={2} colorScheme="red" onClick={handleDeleteTask}>
            Eliminar
        </Button>
    </Flex>
  );
};
