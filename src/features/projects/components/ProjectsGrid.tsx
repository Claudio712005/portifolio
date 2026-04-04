'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types/profile'

const INITIAL_COUNT = 6

interface ProjectsGridProps {
  projects: Project[]
  labels: {
    view_code: string
    no_repo: string
    view_more: string
    view_less: string
    read_more: string
    read_less: string
  }
}

export function ProjectsGrid({ projects, labels }: ProjectsGridProps) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT)
  const hasMore = projects.length > INITIAL_COUNT

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <AnimatedSection key={project.name} delay={index * 0.08}>
            <ProjectCard
              project={project}
              labels={{
                view_code: labels.view_code,
                no_repo: labels.no_repo,
                read_more: labels.read_more,
                read_less: labels.read_less,
              }}
            />
          </AnimatedSection>
        ))}
      </div>

      {hasMore && (
        <AnimatePresence>
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setExpanded((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-indigo-500 px-8 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-500/10 dark:text-indigo-400 dark:hover:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {expanded ? labels.view_less : labels.view_more}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
