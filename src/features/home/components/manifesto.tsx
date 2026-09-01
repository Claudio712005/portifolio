import { SplitText } from '@/components/ui/split-text'
import type { ProfileBasics } from '@/types/profile'

interface ManifestoProps {
  basics: ProfileBasics
}

/**
 * The value proposition at display scale. No label above it: the sentence is
 * the section, and a heading would only repeat what it already says.
 */
export function Manifesto({ basics }: ManifestoProps) {
  return (
    <section className="mx-auto max-w-shell px-5 py-28 lg:px-8 lg:py-40">
      <SplitText
        mode="scrub"
        text={basics.valueProp}
        className="type-display max-w-5xl text-pretty text-d2 text-fg"
      />
    </section>
  )
}
