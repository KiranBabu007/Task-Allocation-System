'use client';

import React, { useState,useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { app, firestore } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const questions = [
    {
        question: 'What is the output of print(2 + 3)?',
        options: ['3', '5', '6', '7'],
        answer: '5',
    },
    {
        question: 'What is the correct way to define a function in Python?',
        options: [
            'def function_name(parameters):',
            'function function_name(parameters)',
            'create function_name(parameters)',
            'define function_name(parameters)',
        ],
        answer: 'def function_name(parameters):',
    },
    {
        question: 'What is the purpose of the "self" keyword in Python?',
        options: [
            'To refer to the current instance of a class',
            'To define a static variable',
            'To create a new object',
            'To import a module',
        ],
        answer: 'To refer to the current instance of a class',
    },
    {
        question: 'What is the difference between a list and a tuple in Python?',
        options: [
            'Lists are mutable, while tuples are immutable',
            'Tuples are mutable, while lists are immutable',
            'There is no difference',
            'Tuples can only store numbers, while lists can store any data type',
        ],
        answer: 'Lists are mutable, while tuples are immutable',
    },
    {
        question: 'What is the output of print(len("Hello, World!"))?',
        options: ['12', '13', '14', '15'],
        answer: '13',
    },
    {
        question: 'What is the purpose of the "pass" statement in Python?',
        options: [
            'To skip over a block of code',
            'To define a new function',
            'To exit a loop',
            'To create an empty class or function',
        ],
        answer: 'To create an empty class or function',
    },
    {
        question: 'What is the output of print(2**3)?',
        options: ['6', '8', '9', '12'],
        answer: '8',
    },
    {
        question: 'What is the purpose of the "if __name__ == "__main__":" statement in Python?',
        options: [
            'To define the entry point of a program',
            'To create a new module',
            'To import a module',
            'To define a class',
        ],
        answer: 'To define the entry point of a program',
    },
    {
        question: 'What is the output of print(round(3.14159, 2))?',
        options: ['3.14', '3.15', '3.1', '3.142'],
        answer: '3.14',
    },
    {
        question: 'What is the purpose of the "try/except" block in Python?',
        options: [
            'To handle exceptions',
            'To define a new function',
            'To create a new class',
            'To import a module',
        ],
        answer: 'To handle exceptions',
    },
    {
        question: 'What is the output of print(sum(range(1, 11)))?',
        options: ['45', '55', '65', '75'],
        answer: '55',
    },
    {
        question: 'What is the purpose of the "lambda" keyword in Python?',
        options: [
            'To create anonymous functions',
            'To define a new class',
            'To import a module',
            'To create a list comprehension',
        ],
        answer: 'To create anonymous functions',
    },
    {
        question: 'What is the purpose of the "zip()" function in Python?',
        options: [
            'To combine two or more iterables into a single iterable',
            'To create a new list',
            'To sort a list',
            'To convert a string to a list',
        ],
        answer: 'To combine two or more iterables into a single iterable',
    },
    {
        question: 'What is the output of print(3 // 2)?',
        options: ['1', '1.5', '2', '2.0'],
        answer: '1',
    },
    {
        question: 'What is the purpose of the "with" statement in Python?',
        options: [
            'To handle file operations more efficiently',
            'To define a new function',
            'To create a new class',
            'To import a module',
        ],
        answer: 'To handle file operations more efficiently',
    },
];

const PythonTestPage = () => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId('');
            }
        });

        return unsubscribe;
    }, []);

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

        if (userId) {
            updateTestResultInFirestore(currentScore);
        } else {
            console.error('No user is currently signed in.');
        }
    };

    const updateTestResultInFirestore = async (score: number) => {
        try {
            const testResultRef = doc(firestore, 'testresults', userId);
            await updateDoc(testResultRef, { 'react': score });
            console.log('Test result updated in Firestore successfully!');
        } catch (error) {
            console.error('Error updating test result in Firestore:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">React Test</h1>
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

export default PythonTestPage;