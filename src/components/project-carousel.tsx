"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import type { Project } from "@/lib/projects"

interface ProjectCarouselProps {
  readonly projects: Project[] 
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
      }
    }

    updateMaxScroll()
    window.addEventListener("resize", updateMaxScroll)
    return () => window.removeEventListener("resize", updateMaxScroll)
  }, [projects])

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(maxScroll, scrollPosition + scrollAmount)

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
      setScrollPosition(newPosition)
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background shadow-md"
          onClick={() => scroll("left")}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project) => (
          <div key={project.id} className="min-w-[300px] md:min-w-[350px] snap-start">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background shadow-md"
          onClick={() => scroll("right")}
          disabled={scrollPosition >= maxScroll}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
