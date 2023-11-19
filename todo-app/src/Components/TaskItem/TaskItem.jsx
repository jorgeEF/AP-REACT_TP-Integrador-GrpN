import React from 'react';
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
