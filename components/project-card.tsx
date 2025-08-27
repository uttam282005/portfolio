
"use client"

import { ExternalLink, Github, ImageIcon } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  year: string
  description: string
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
  imageUrl?: string
}

export function ProjectCard({
  title,
  imageUrl,
  year,
  description,
  technologies,
  projectUrl,
  githubUrl,
}: ProjectCardProps) {

  return (
    <div className="group">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Project Image */}
        <div className="lg:w-1/3">
          <div className="aspect-[3/2] relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            {projectUrl ? (
              <img
                src={imageUrl}
                alt={`${title} preview`}
                className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:w-2/3">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              {projectUrl ? (
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 flex items-center gap-2"
                >
                  {title}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-500 font-mono">{year}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Links */}
          <div className="flex gap-4">
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Link>
            )}
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                Source Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
