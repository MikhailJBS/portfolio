import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to home</span>
          </Link>
          <h1 className="text-3xl font-bold">All Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
