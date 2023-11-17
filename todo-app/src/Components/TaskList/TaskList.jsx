import React from 'react';
import { Flex, Box, Text, Center } from '@chakra-ui/react'
import { TaskItem } from '../TaskItem/TaskItem';

export const TaskList = ({ tasks, onTaskCompleted, onDeleteTask }) => {
    return (
        <>
            <Text mt='20px'>TAREAS</Text>
            <Flex flexDirection="column" mt={4}>
                {tasks.map((task) => (
                    <TaskItem
                    key={task.id}
                    task={task}
                    onTaskCompleted={onTaskCompleted}
                    onDeleteTask={onDeleteTask}
                    />
                ))}
            </Flex>
        </>
    );
};