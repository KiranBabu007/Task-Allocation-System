'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const questions = [
    {
        question: 'What does the acronym "CPU" stand for?',
        options: ['Central Processing Unit', 'Computer Processing Unit', 'Control Processing Unit', 'Central Program Unit'],
        answer: 'Central Processing Unit',
    },
    {
        question: 'Which symbol is used to indicate a single line comment in C?',
        options: ['//', '/*', '#', '--'],
        answer: '//',
    },
    {
        question: 'What is the output of printf("Hello, World!\n"); in C?',
        options: ['Hello, World!', 'Hello, World!\n', 'Hello, World! followed by a newline character', 'Nothing'],
        answer: 'Hello, World! followed by a newline character',
    },
    {
        question: 'Which keyword is used to define a constant in C?',
        options: ['const', 'var', 'let', 'constant'],
        answer: 'const',
    },
    {
        question: 'What is the purpose of the "break" statement in a loop in C?',
        options: ['To terminate the loop', 'To skip the current iteration', 'To continue to the next iteration', 'To define a new loop'],
        answer: 'To terminate the loop',
    },
    {
        question: 'Which data type is used to store a single character in C?',
        options: ['char', 'int', 'float', 'string'],
        answer: 'char',
    },
    {
        question: 'What is the result of the expression 5 % 2 in C?',
        options: ['2', '2.5', '3', '1'],
        answer: '1',
    },
    {
        question: 'Which header file should be included to use the printf() function in C?',
        options: ['<stdio.h>', '<stdlib.h>', '<math.h>', '<string.h>'],
        answer: '<stdio.h>',
    },
    {
        question: 'What is the purpose of the "sizeof" operator in C?',
        options: ['To determine the size of a variable or data type', 'To perform arithmetic operations', 'To allocate memory dynamically', 'To compare two values'],
        answer: 'To determine the size of a variable or data type',
    },
    {
        question: 'Which operator is used for pointer access in C?',
        options: ['*', '->', '.', '&'],
        answer: '->',
    },
    {
        question: 'What is the purpose of the "scanf" function in C?',
        options: ['To print formatted output', 'To read input from the user', 'To perform mathematical calculations', 'To define a new function'],
        answer: 'To read input from the user',
    },
    {
        question: 'Which loop structure is used to execute a block of code repeatedly in C?',
        options: ['for', 'while', 'do-while', 'if-else'],
        answer: 'for',
    },
];


const page = () => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleCheckboxChange = (optionIndex: number, questionIndex: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = `${optionIndex}`;
        setAnswers(updatedAnswers);
    };

    const calculateScore = () => {
        let currentScore = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.answer) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setShowResult(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">C Programming Test</h1>
            {questions.map((question, index) => (
                <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center">
                                <Checkbox
                                    id={`${index}-${optionIndex}`}
                                    checked={answers[index] === `${optionIndex}`}
                                    onCheckedChange={() => handleCheckboxChange(optionIndex, index)}
                                    className="mr-2"
                                />
                                <label htmlFor={`${index}-${optionIndex}`} className="text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {showResult ? (
                <div className="mt-8 text-center">
                    <p className="text-2xl font-semibold mb-2">Your score: {score} out of {questions.length}</p>
                    <p className="text-xl font-semibold">Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
                </div>
            ) : (
                <div className="text-center">
                    <Button onClick={calculateScore} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Submit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default page;