import React, { useState, useEffect } from 'react';
import { Box, Spacer, Heading, Text, Center, useToast, MenuButton, Menu, IconButton, Flex } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { TaskList } from './Components/TaskList/TaskList';
import { TaskForm } from './Components/TaskForm/TaskForm';

export const App = () => {
  const [tasks, setTasks] = useState(() => {
    // Intenta obtener las tareas desde localStorage al cargar la aplicación
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [taskIdCounter, setTaskIdCounter] = useState(() => {
    const storedIdCounter = localStorage.getItem('taskIdCounter');
    return storedIdCounter ? parseInt(storedIdCounter, 10) : 1;
  });

  const [actionPerformed, setActionPerformed] = useState(false);
  const toast = useToast();

  // Guarda las tareas en localStorage cuando se actualiza el estado
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskIdCounter', taskIdCounter.toString());
    if (actionPerformed) {
      toast({
        title: 'Lista de tareas actualizada',
        description: 'Se ha actualizado la lista de tareas.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setActionPerformed(false);
    }
  }, [tasks, taskIdCounter, actionPerformed, toast]);

  const handleTaskCompleted = (taskId, isCompleted) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddTask = (taskName) => {
    const newTask = {
      id: taskIdCounter,
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskIdCounter(taskIdCounter + 1);
    setActionPerformed(true);
  };

  return (
    <Center height="100vh">
      <Box p={4} mt={4} bg="blue.700" borderRadius="md" color="white">
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box>
            <Menu isDisabled={true}>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<HamburgerIcon color='white' />}
                variant='outline'
                border='none'
                _hover={{ bg: 'blue.700' }}
                _active={{ bg: 'blue.700' }}
              />
            </Menu>
          </Box>
          <Spacer />
          <Heading size="xs" color='gray.300'>MIS TAREAS</Heading>
        </Flex>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          onTaskCompleted={handleTaskCompleted}
          onDeleteTask={handleDeleteTask}
        />
      </Box>
    </Center>
  );
};
