'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Dictionary } from '@/types/dictionary'
import type { ProfileBasics } from '@/types/profile'
import { HeroThreeBg } from '@/components/ui/hero-three-bg'

interface HeroProps {
  dict: Dictionary['hero']
  basics: ProfileBasics
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export function Hero({ dict, basics }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
    >
      <HeroThreeBg />

      <motion.div
        className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-48 -left-24 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-4 font-mono text-lg text-indigo-600 dark:text-indigo-400"
          >
            {dict.greeting}
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="mb-4 text-5xl font-bold text-slate-900 dark:text-white md:text-6xl"
          >
            {basics.name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mb-6 text-2xl font-semibold text-indigo-600 dark:text-indigo-400 md:text-3xl"
          >
            {basics.title}
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {basics.summary}
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <motion.a
              href="#projects"
              className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {dict.cta_projects}
            </motion.a>
            <motion.a
              href="#contact"
              className="rounded-lg border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {dict.cta_contact}
            </motion.a>
            {dict.cta_resume && (
              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-lg border border-indigo-500 px-8 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-500/10 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-white"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {dict.cta_resume}
              </motion.a>
            )}
          </motion.div>
        </div>

        <motion.div
          {...fadeIn(0.3)}
          className="relative shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 opacity-20 blur-xl" />
          <div className="relative h-64 w-64 overflow-hidden rounded-full ring-4 ring-indigo-500/30 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 md:h-72 md:w-72">
            <Image
              src="/img/profile.jpeg"
              alt={basics.name}
              fill
              sizes="(max-width: 768px) 256px, 288px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
