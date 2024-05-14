"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function SparklesPreview() {
  const [projectData, setProjectData] = useState(null);
  const [task1Deadline, setTask1Deadline] = useState(new Date("2023-06-15T18:00:00"));
  const [task2Deadline, setTask2Deadline] = useState(new Date("2023-07-01T12:00:00"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const docRef = doc(db, "employeeprojects", userId);
        const unsubscribeDoc = onSnapshot(
          docRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              setProjectData(docSnapshot.data());
            } else {
              console.log("No such document!");
              setProjectData(null);
            }
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching document:", error);
            setIsLoading(false);
          }
        );

        return () => unsubscribeDoc();
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="h-[40rem] relative w-full bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="relative z-20 w-full flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-center mt-0 fixed top-0 w-full py-8">
          Current Tasks
        </h1>
      </div>
      <div className="relative z-20 flex flex-col space-y-4 justify-between">
        {isLoading ? (
          <p>Loading...</p>
        ) : projectData ? (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{projectData.projectName}</h2>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p>{projectData.description}</p>
                <div className="mt-2 px-2 py-1 bg-blue-100 rounded-md border border-blue-300">
                  <p className="text-sm">Deadline: {task1Deadline.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {projectData.skills.C}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${projectData.skills.C}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No project data found.</p>
        )}
      </div>
    </div>
  );
}

export default SparklesPreview;