import React, { useState } from 'react';
import { Flex, Input, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const TaskForm = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');

    const handleInputChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(taskName);
        setTaskName('');
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
                    <IconButton
                        type="submit"
                        isRound={true}
                        variant="solid"
                        colorScheme="teal"
                        aria-label="Agregar"
                        size='sm'
                        fontSize="12px"
                        icon={<AddIcon />}
                    />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};
