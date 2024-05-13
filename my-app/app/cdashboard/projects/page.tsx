'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface Project {
    id: number
    name: string
    description: string
}

const page = () => {
    const [projects, setProjects] = useState<Project[]>([
        { id: 1, name: "Project 1", description: "This is project 1." },
        { id: 2, name: "Project 2", description: "This is project 2." },
    ])
    const [newProject, setNewProject] = useState<Project>({ id: 0, name: "", description: "" })

    const addProject = () => {
        if (newProject.name && newProject.description) {
            setProjects([...projects, { ...newProject, id: projects.length + 1 }])
            setNewProject({ id: 0, name: "", description: "" })
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold">Projects</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-md"
                        >
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold">Add New Project</h2>
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
                    <Button onClick={addProject}>Add Project</Button>
                </div>
            </div>
        </div>
    )
}

export default page