import Image from "next/image";
import Link from "next/link";
import placeholder from "../../../../public/assets/placeholder.png";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/projects";

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to projects</span>
          </Link>
          <h1 className="text-3xl font-bold">{project.title}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-white">
              <Image
                src={project.image || placeholder}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About this project</h2>
              <p>{project.description}</p>
              <p>{project.longDescription}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-purple-400/20 text-purple-300 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg border border-white/10 p-6 space-y-4">
              <h2 className="text-xl font-bold">Project Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Year</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Client</span>
                  <span>{project.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span>{project.type}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Preview
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}