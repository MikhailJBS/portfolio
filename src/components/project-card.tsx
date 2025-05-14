import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  readonly project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-lg border border-white/10 overflow-hidden bg-white/5 transition-all hover:bg-white/10">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=600&width=800"}
          alt={project.title}
          width={800}
          height={600}
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg">{project.title}</h3>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{project.type}</span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 pt-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-0.5 bg-white/10 text-xs rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 bg-white/10 text-xs rounded-full">+{project.technologies.length - 3}</span>
          )}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Details <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
