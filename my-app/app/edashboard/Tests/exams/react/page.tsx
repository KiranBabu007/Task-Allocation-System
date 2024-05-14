'use client';

import React, { useState,useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { app, firestore } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const questions = [
    {
        question: 'What does JSX stand for in React.js?',
        options: ['JavaScript XML', 'JavaScript Extension', 'JSON XML', 'Java Standard Extension'],
        answer: 'JavaScript XML',
    },
    {
        question: 'Which lifecycle method is called once a component is mounted on the DOM in React.js?',
        options: ['componentDidMount()', 'componentWillMount()', 'render()', 'componentDidUpdate()'],
        answer: 'componentDidMount()',
    },
    {
        question: 'What is the purpose of state in React.js?',
        options: [
            'To store mutable data that affects a component\'s rendering',
            'To define static data for a component',
            'To handle routing in React',
            'To store CSS styles for a component',
        ],
        answer: 'To store mutable data that affects a component\'s rendering',
    },
    {
        question: 'What is the difference between props and state in React.js?',
        options: [
            'Props are read-only, state is mutable',
            'State is passed from parent components, props are defined within the component',
            'There is no difference',
            'Props are mutable, state is read-only',
        ],
        answer: 'Props are read-only, state is mutable',
    },
    {
        question: 'What is the purpose of the "render()" method in React.js components?',
        options: [
            'To return JSX that represents the component\'s UI',
            'To define CSS styles for the component',
            'To handle component state changes',
            'To handle component props',
        ],
        answer: 'To return JSX that represents the component\'s UI',
    },
    {
        question: 'What is the purpose of keys in React.js when rendering lists?',
        options: [
            'To uniquely identify list items and optimize re-rendering',
            'To apply CSS styles to list items',
            'To define the order of list items',
            'To determine the length of the list',
        ],
        answer: 'To uniquely identify list items and optimize re-rendering',
    },
    {
        question: 'What is the correct way to update state in React.js?',
        options: [
            'Using the setState() method',
            'Directly modifying the state object',
            'Using the props() method',
            'State cannot be updated in React.js',
        ],
        answer: 'Using the setState() method',
    },
    {
        question: 'What is the purpose of React.js Hooks?',
        options: [
            'To add state and other features to functional components',
            'To define class components in React',
            'To handle asynchronous operations in React',
            'To create custom hooks for data fetching',
        ],
        answer: 'To add state and other features to functional components',
    },
    {
        question: 'What is the output of console.log(typeof useState()) in React.js?',
        options: ['"object"', '"array"', '"string"', '"number"'],
        answer: '"object"',
    },
    {
        question: 'What is the purpose of the useEffect() hook in React.js?',
        options: [
            'To perform side effects in function components',
            'To update component state',
            'To define event listeners in class components',
            'To handle routing in React.js',
        ],
        answer: 'To perform side effects in function components',
    },
    {
        question: 'What is a React.js component?',
        options: [
            'A reusable piece of UI that can contain HTML, CSS, and JavaScript logic',
            'A function used to fetch data from an API',
            'A tool for handling CSS styles in React',
            'A built-in React feature for state management',
        ],
        answer: 'A reusable piece of UI that can contain HTML, CSS, and JavaScript logic',
    },
    {
        question: 'What is the purpose of React Router in React.js?',
        options: [
            'To handle client-side routing',
            'To manage component state',
            'To optimize performance',
            'To create custom hooks',
        ],
        answer: 'To handle client-side routing',
    },
    {
        question: 'What is the purpose of propTypes in React.js?',
        options: [
            'To validate the types of props passed to a component',
            'To define CSS styles for a component',
            'To manage component state',
            'To handle asynchronous operations',
        ],
        answer: 'To validate the types of props passed to a component',
    },
    {
        question: 'What is the output of console.log(React.version) in React.js?',
        options: ['The current version of React.js', 'An error message', 'The browser version', 'Undefined'],
        answer: 'The current version of React.js',
    },
    {
        question: 'What is the purpose of React Context in React.js?',
        options: [
            'To share data between components without having to pass props manually',
            'To define the structure of a component',
            'To handle component state changes',
            'To manage asynchronous operations',
        ],
        answer: 'To share data between components without having to pass props manually',
    },
];

const Page = () => {
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

export default Page;