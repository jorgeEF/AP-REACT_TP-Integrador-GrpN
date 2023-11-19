import React, { useState } from 'react';
import { Flex, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const TaskForm = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());

    const handleInputChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleDateChange = (date) => {
        setDueDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(taskName, dueDate);
        setTaskName('');
        setDueDate(new Date());
        setShowCalendar(false);
    };

    return (
        <Flex as="form" onSubmit={handleSubmit} alignItems="center">
            <InputGroup flex="1" mr={2}>
                <Input
                    type="text"
                    placeholder='Agregar tarea'
                    value={taskName}
                    onChange={handleInputChange}
                    bgColor='blue.900'
                    border='none'
                    rounded='25px'
                />
                <InputRightElement>
                    <Button
                        type="button"
                        variant="solid"
                        borderRadius="300px"
                        mr="5px"
                        colorScheme="teal"
                        size='sm'
                        fontSize="12px"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <AddIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>

            {showCalendar && (
                <Flex flexDirection="column" alignItems="center" color="black" ml="260px" mt="170px" position="absolute" zIndex="1">
                    <Calendar
                        onChange={handleDateChange}
                        value={dueDate}
                        minDate={new Date()}  

                    />
                    <Button
                        type="button"
                        variant="solid"
                        colorScheme="teal"
                        size='sm'
                        fontSize="14px"
                        onClick={handleSubmit}
                        mt={2}  
                    >
                        Agregar 
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};
