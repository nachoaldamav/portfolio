import { motion, useTransform, useViewportScroll } from 'framer-motion'

export default function ScrollPage() {
  const { scrollYProgress } = useViewportScroll()

  const steps = Array.from({ length: 100 }, (_, i) => (i + 1) * 0.01)

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1])

  const y = useTransform(
    scrollYProgress,
    [...steps],
    [...steps.map((step) => step * 500)]
  )

  const x = useTransform(
    scrollYProgress,
    [...steps],
    [...steps.map((step) => step * 1000)]
  )

  return (
    <div className="relative h-full min-h-screen w-full">
      <div className="fixed top-0 left-0 h-full w-full">
        <motion.span
          className="absolute z-0 h-96 w-96 rounded-full bg-blue-700"
          style={{
            scale,
            x,
            y,
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        />
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="h-screen w-full" />
      ))}
    </div>
  )
}
