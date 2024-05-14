"use client";
import React, { useState, useEffect } from "react";

export function SparklesPreview() {
  const [task1Deadline, setTask1Deadline] = useState(new Date("2023-06-15T18:00:00")); // Set the deadline date and time
  const [task2Deadline, setTask2Deadline] = useState(new Date("2023-07-01T12:00:00")); // Set the deadline date and time

  useEffect(() => {
    const timer1 = setInterval(() => {
      setTask1Deadline((prevDeadline) => new Date(prevDeadline.getTime() - 1000)); // Decrement 1 second
    }, 1000);

    const timer2 = setInterval(() => {
      setTask2Deadline((prevDeadline) => new Date(prevDeadline.getTime() - 1000)); // Decrement 1 second
    }, 1000);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  return (
    <div className="h-[40rem] relative w-full bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="relative z-20 w-full flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-center mt-0 fixed top-0 w-full py-8">
          Current Tasks
        </h1>
      </div>
      <div className="relative z-20 flex flex-col space-y-4 justify-between">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Task 1</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p>Optimize application for maximum speed and scalability.</p>
            <div className="mt-2 px-2 py-1 bg-blue-100 rounded-md border border-blue-300">
              <p className="text-sm">
                Deadline: {task1Deadline.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              75%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Task 2</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p>Develop the new user-facing features</p>
            <div className="mt-2 px-2 py-1 bg-blue-100 rounded-md border border-blue-300">
              <p className="text-sm">
                Deadline: {task2Deadline.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              40%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SparklesPreview;