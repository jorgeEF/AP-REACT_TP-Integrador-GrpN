import React, { useState, useEffect } from 'react';
import {  
    Box, Spacer, Heading, Text, Center, useToast, MenuButton, Menu, IconButton, Flex, 
    useColorMode, Divider, Accordion, AccordionButton, AccordionIcon, List, AccordionItem , 
    AccordionPanel, ListItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { TaskList } from './Components/TaskList/TaskList';
import { TaskForm } from './Components/TaskForm/TaskForm';
import {FaSun, FaMoon } from 'react-icons/fa'
import {
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

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
  
  //funcion para cambiar el estado de oscuro a claro
  const [oscuro, setOscuro] = useState(true)
  const cambiarModo =()=>{
    setOscuro(!oscuro);
  }

  return (
    <Center height="100vh">
      <Box p={4} mt={4} bg={oscuro ?"#31315b":"#ffffff"}  borderRadius="md" color="#ffffff">
        <Flex  minWidth='max-content' alignItems='center' gap='2'>
          <Box mb="6px">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<HamburgerIcon color={oscuro ?"#8e8fb5":"#31315b" } 
                fontSize="22px" 
                />}
                _focus={{ bg: oscuro?"#31315b":"#ffffff"}}
                variant='outline'
                border='none'
                _hover={{ bg: oscuro?"#31315b":"#ffffff"}}
              />
              <MenuList maxW="225px" minW="225px" bg={oscuro?'#4F5481': '#8e8fb5'}>
                <MenuOptionGroup >
                  <Text onClick={cambiarModo}> <IconButton  isRound='true' icon={oscuro ? <FaSun /> : <FaMoon />}  color="#ffffff" bg={oscuro ?"#4f5481":"#8e8fb5"} _hover={{ bg:oscuro ?"#4f5481":"#8e8fb5" }}></IconButton>{oscuro?'Modo Oscuro':'Modo Claro'}</Text>
                </MenuOptionGroup>
                <MenuDivider bg={oscuro ?"#ffffff":"#31315b"}color={oscuro ?"#31315b":"#8e8fb5"}/>
                <MenuOptionGroup title='To Do List'>
                  <Accordion allowToggle>
                    <AccordionItem color="#31315b" bg="#ffffff">  
                      <h2>
                        <AccordionButton color="#ffffff" bg={oscuro ?"#4f5481":"#8e8fb5"} _hover={oscuro?"#31315b":"#8e8fb5"}>
                          <Box as="span" flex='1' textAlign='left'>
                            El Proyecto
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem color="#31315b" bg="#ffffff">
                      <h2>
                        <AccordionButton color="#ffffff" bg={oscuro ?"#4f5481":"#8e8fb5"} _hover={oscuro?"#31315b":"#8e8fb5"}>
                          <Box as="span" flex='1' textAlign='left'>
                            Integrantes
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <List>
                          <ListItem> Fernández Sebastián</ListItem>
                          <ListItem> Jorge Esteban Femenia</ListItem>
                          <ListItem> María Belén Guillamondegui</ListItem>
                          <ListItem> Facundo Ezequiel García</ListItem>
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
          <Spacer />
          <Heading size="xs" color={oscuro?'#4F5481': '#cccede'} >MIS TAREAS</Heading>
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
