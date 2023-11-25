import React, { useState, useEffect } from 'react';
import { Box, Spacer, Heading, Text, Center, useToast, MenuButton, Menu, IconButton, Flex, useColorMode, Divider } from '@chakra-ui/react';
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
  
  const [oscuro, setOscuro] = useState(true)
  const cambiarModo =()=>{
    setOscuro(!oscuro);
  }
  return (
    <Center height="100vh">
      <Box p={4} mt={4} bg={oscuro ?"#31315b":"white"}  borderRadius="md" color="white">
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mb="6px">
            <Menu isDisabled={true}>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<HamburgerIcon color={oscuro ?"#8e8fb5":"#31315b"}
                fontSize="22px" 
                />}
                variant='outline'
                border='none'
                _hover={{ bg: oscuro?"#31315b":"#ffffff"}}
              />
            </Menu>
          </Box>
          <Spacer />
          <Heading size="xs" color={oscuro?'#4F5481': '#707186'} onClick={cambiarModo} >MIS TAREAS</Heading>
        </Flex>
        <TaskForm onAddTask={handleAddTask} oscuro={oscuro} />
        <Divider mt="10px"/>
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          onTaskCompleted={handleTaskCompleted}
          onDeleteTask={handleDeleteTask}
          oscuro={oscuro}
        />
      </Box>
    </Center>
  );
};
