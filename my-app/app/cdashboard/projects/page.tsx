'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { app, firestore } from '@/firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const skillOptions = ['React', 'Java', 'C', 'Python', 'AI/ML', 'JavaScript'];

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