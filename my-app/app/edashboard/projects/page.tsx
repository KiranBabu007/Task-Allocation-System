"use client";
import React from "react";


export function SparklesPreview() {
    return (
        <div className="h-[40rem] relative w-full bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="relative z-20 w-full flex justify-center mb-8">
                <h1 className="text-4xl font-bold text-center mt-0 fixed top-0 w-full py-8">
                    Current Projects
                </h1>
            </div>

            <div className="relative z-20 flex flex-col space-y-4 justify-between">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Project 1</h2>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <p>This is the content for Card 1.</p>
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
                    <h2 className="text-2xl font-bold mb-4">Project 2</h2>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <p>This is the content for Card 2.</p>
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