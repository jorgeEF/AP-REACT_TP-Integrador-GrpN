import React from 'react';
import { Flex, Heading, Box, Text, Center } from '@chakra-ui/react'
import { TaskItem } from '../TaskItem/TaskItem';

export const TaskList = ({ tasks, onTaskCompleted, onDeleteTask }) => {

    // Filtrar tareas por completar y tareas completadas
    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <>
            <Flex flexDirection="column" mt={4}>
                {/* Lista de tareas por completar */}
                <Heading size="md" mb={2}>
                    Por hacer
                </Heading>
                {incompleteTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onTaskCompleted={onTaskCompleted}
                        onDeleteTask={onDeleteTask}
                    />
                ))}

                {/* Lista de tareas completadas */}
                {completedTasks.length > 0 && (
                    <>
                        <Heading size="md" mt={4} mb={2}>
                            Completadas
                        </Heading>
                        {completedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onTaskCompleted={onTaskCompleted}
                                onDeleteTask={onDeleteTask}
                            />
                        ))}
                    </>
                )}
            </Flex>
        </>
    );
};