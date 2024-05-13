'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const questions = [
    {
        question: 'What does JDK stand for in Java programming?',
        options: ['Java Development Kit', 'Java Debugging Kit', 'Java Deployment Kit', 'Java Documentation Kit'],
        answer: 'Java Development Kit',
    },
    {
        question: 'Which keyword is used to define a class in Java?',
        options: ['class', 'Class', 'Class()', 'class()'],
        answer: 'class',
    },
    {
        question: 'What is the output of System.out.println(5 == 5); in Java?',
        options: ['true', 'false', 'compile-time error', 'runtime error'],
        answer: 'true',
    },
    {
        question: 'Which access modifier is the most restrictive in Java?',
        options: ['private', 'protected', 'public', 'default'],
        answer: 'private',
    },
    {
        question: 'Which data type is used to store a single character in Java?',
        options: ['char', 'Character', 'String', 'int'],
        answer: 'char',
    },
    {
        question: 'What is the purpose of the "static" keyword in Java?',
        options: ['To create a class-level variable or method', 'To define a constant', 'To indicate that a method does not return a value', 'To prevent inheritance'],
        answer: 'To create a class-level variable or method',
    },
    {
        question: 'Which loop structure is used to execute a block of code repeatedly in Java?',
        options: ['for', 'while', 'do-while', 'if-else'],
        answer: 'for',
    },
    {
        question: 'What is the output of the following code snippet?\n\nint x = 5;\nSystem.out.println(x++);',
        options: ['5', '6', '4', 'compile-time error'],
        answer: '5',
    },
    {
        question: 'What is the purpose of the "extends" keyword in Java?',
        options: ['To inherit from a superclass', 'To implement an interface', 'To create an object', 'To override a method'],
        answer: 'To inherit from a superclass',
    },
    {
        question: 'Which collection class in Java allows duplicate elements?',
        options: ['ArrayList', 'HashSet', 'TreeSet', 'HashMap'],
        answer: 'ArrayList',
    },
    {
        question: 'What is the output of System.out.println("Java".charAt(2)); in Java?',
        options: ['J', 'a', 'v', 'compile-time error'],
        answer: 'v',
    },
    {
        question: 'What is the purpose of the "this" keyword in Java?',
        options: ['To refer to the current object instance', 'To access superclass methods', 'To declare a constant', 'To define a new class'],
        answer: 'To refer to the current object instance',
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
            <h1 className="text-3xl font-bold mb-6 text-center">Java Test</h1>
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