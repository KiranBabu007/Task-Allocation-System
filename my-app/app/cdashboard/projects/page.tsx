'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { app, firestore } from '@/firebaseConfig';
import { addDoc, collection, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const skillOptions = ['React', 'Java', 'C', 'Python', 'AI/ML', 'JavaScript'];

const assignProject = async (project, setProjects) => {
    try {
        // Get the required skills for the project
        const requiredSkills = project.skills;

        // Fetch all test results from Firestore
        const testResultsCollection = collection(firestore, 'testresults');
        const testResultsSnapshot = await getDocs(testResultsCollection);

        // Map to store the maximum score for each skill
        const maxScores = {};

        // Find the maximum score for each required skill
        testResultsSnapshot.forEach((doc) => {
            const testResult = doc.data();
            requiredSkills.forEach((skill) => {
                const score = testResult[skill] || 0; // Handle cases where the skill is not present
                if (!maxScores[skill] || score > maxScores[skill].score) {
                    maxScores[skill] = { userId: doc.id, score };
                }
            });
        });

        // Assign the project to the user(s) with the maximum score for each required skill
        const assignedEmployees = {};
        requiredSkills.forEach((skill) => {
            if (maxScores[skill]) {
                const userId = maxScores[skill].userId;
                assignedEmployees[userId] = assignedEmployees[userId] || { userId, skills: {} };
                assignedEmployees[userId].skills[skill] = maxScores[skill].score;
            }
        });

        // Display assigned employees information as an alert
        const alertMessage = Object.keys(assignedEmployees).map((userId) => {
            return `Employee ID: ${userId}, Skills: ${Object.keys(assignedEmployees[userId].skills).join(', ')}`;
        }).join('\n');

        alert(`Assigned Employees:\n${alertMessage}`);

        // Update the project card with assigned employees
        setProjects((prevProjects) => {
            return prevProjects.map((prevProject) => {
                if (prevProject.id === project.id) {
                    return { ...prevProject, assignedEmployees };
                }
                return prevProject;
            });
        });

        // Insert assigned employees into the employeeprojects collection
        const employeeprojectsCollection = collection(firestore, 'employeeprojects');

        // Loop through assigned employees and add their data to the collection
        for (const userId in assignedEmployees) {
            const employeeData = {
                projectId: project.id,
                projectName: project.name,
                skills: assignedEmployees[userId].skills
            };
            const docRef = doc(employeeprojectsCollection, userId);
            await setDoc(docRef, employeeData);
        }

    } catch (error) {
        console.error('Error assigning project:', error);
    }
};

const Page = () => {
    const [newProject, setNewProject] = useState({
        id: 0,
        name: '',
        description: '',
        skills: [],
    });
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const projectsCollection = collection(firestore, 'projects');
            const projectsSnapshot = await getDocs(projectsCollection);
            const fetchedProjects = projectsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(fetchedProjects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const addProjectToFirestore = async (project) => {
        try {
            const docRef = await addDoc(collection(firestore, 'projects'), project);
            console.log('Project added with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const addProject = async () => {
        if (newProject.name && newProject.description) {
            const projectData = {
                name: newProject.name,
                description: newProject.description,
                skills: newProject.skills,
            };

            await addProjectToFirestore(projectData);
            setNewProject({ id: 0, name: '', description: '', skills: [] });
            fetchProjects(); // Fetch updated projects after adding a new project
        }
    };

    const handleSkillChange = (skill) => {
        setNewProject({
            ...newProject,
            skills: newProject.skills.includes(skill)
                ? newProject.skills.filter((s) => s !== skill)
                : [...newProject.skills, skill],
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold mb-5">Projects</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
                            <h3 className="text-lg font-semibold font-sans">{project.name}</h3>
                            <p className="text-gray-600 font-sans">{project.description}</p>
                            <div className="mt-2">
                                <span className="font-semibold mb-2 font-sans">Skills:</span>
                                <div className="flex flex-wrap gap-1 font-mono">
                                    {project.skills.map((skill) => (
                                        <span key={skill} className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {project.assignedEmployees && (
                                <div className="mt-2">
                                    <span className="font-semibold mb-2 font-sans">Assigned Employees:</span>
                                    <div className="flex flex-wrap gap-1 font-mono">
                                        {Object.values(project.assignedEmployees).map((employee) => (
                                            <span key={employee.userId} className="rounded bg-gray-200 px-2 py-1 text-xs m-5">
                                                Employee ID: {employee.userId}, Skills: {Object.keys(employee.skills).join(', ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Button onClick={() => assignProject(project, setProjects)}>Assign Project</Button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-2">Add New Project</h2>
                <div className="space-y-4">
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                            placeholder="Enter project name"
                        />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Enter project description"
                        />
                    </div>
                    <div>
                        <h5 className="mb-2 font-mono font-bold">Skills</h5>
                        <div className="flex flex-wrap font-mono gap-2">
                            {skillOptions.map((skill) => (
                                <div key={skill} className="flex items-center">
                                    <Checkbox
                                        id={skill}
                                        checked={newProject.skills.includes(skill)}
                                        onCheckedChange={() => handleSkillChange(skill)}
                                    />
                                    <Label htmlFor={skill} className="ml-2">
                                        {skill}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button onClick={addProject}>Add Project</Button>
                </div>
            </div>
        </div>
    );
};

export default Page;
