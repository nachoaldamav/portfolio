import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useIntersection from '../hooks/useIntersection'

const scenes = [
  {
    id: 0,
    title: 'Home',
    link: '/',
    bubbles: [
      {
        x: -10,
        y: -10,
        width: '25rem',
      },
      {
        x: 80,
        y: 65,
        width: '30rem',
      },
    ],
  },
  {
    id: 1,
    title: 'About',
    link: '/about',
    bubbles: [
      {
        x: 65,
        y: -10,
        width: '25rem',
      },
      {
        x: -10,
        y: 30,
        width: '35rem',
      },
    ],
  },
  {
    id: 2,
    title: 'Projects',
    link: '/',
    bubbles: [
      {
        x: 20,
        y: 70,
        width: '35rem',
      },
      {
        x: 60,
        y: -10,
        width: '30rem',
      },
    ],
  },
]

export default function Home() {
  // Disable for server
  if (typeof window === 'undefined') return null

  const [currentScene, setCurrentScene] = useState(0)

  return (
    <main className="flex h-full min-h-screen snap-y snap-proximity flex-col bg-black">
      <div className="fixed top-0 left-0 h-screen w-full">
        <span className="absolute z-10 h-screen w-full bg-opacity-70 bg-clip-padding backdrop-blur-[75px] backdrop-filter"></span>
        <Bubbles scene={currentScene} />
      </div>
      <div className="z-20 h-screen w-full snap-y snap-mandatory overflow-scroll overflow-x-hidden">
        <HomeSection
          id="home"
          scene={0}
          setScene={setCurrentScene}
          currentScene={currentScene}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white">
              <span className="font-semibold text-opacity-75">Hello, I'm </span>
              <span className="font-bold text-opacity-50">Nacho</span>
            </h1>
            <p className="text-white text-opacity-50">
              I'm a developer based in Valladolid, Spain.
            </p>
          </div>
        </HomeSection>
        <HomeSection
          id="about"
          scene={1}
          setScene={setCurrentScene}
          currentScene={currentScene}
        >
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl text-white">
              <span className="font-semibold text-opacity-75">
                I'm a junior full-stack developer
              </span>
            </h2>
            {/* Add languages */}
          </div>
        </HomeSection>
        <HomeSection
          id="projects"
          scene={2}
          setScene={setCurrentScene}
          currentScene={currentScene}
        >
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl text-white">
              <span className="text-3xl font-semibold text-opacity-75">
                Projects
              </span>
            </h2>
            <div className="sc1 relative my-10 mx-10 flex h-64 w-3/4 transform snap-x items-center gap-10 overflow-x-auto py-4 transition duration-300 ease-in-out md:mx-0 md:w-2/4">
              <div className="shrink-0 snap-center">
                <div className="w-28 shrink-0 sm:w-96"></div>
              </div>
              {Array.from({ length: 5 }).map((_, index) => (
                <CardProject
                  title={`Project ${index + 1}`}
                  description={`
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                `}
                  image="https://source.unsplash.com/random"
                  link="https://www.google.com"
                />
              ))}
              <div className="shrink-0 snap-center">
                <div className="w-4 shrink-0 sm:w-96"></div>
              </div>
            </div>
          </div>
        </HomeSection>
      </div>
    </main>
  )
}

const HomeSection = ({ children, id, setScene, scene, currentScene }: any) => {
  const ref = useRef(id)
  const inViewport = useIntersection(ref, '-100px') // Trigger as soon as the element becomes visible// Trigger if 200px is visible from the element

  if (inViewport) {
    console.log('in viewport:', ref.current)
    console.log('current scene:', currentScene)
    setScene(scene)
  }

  return (
    <section
      id={id}
      ref={ref}
      className="z-20 flex h-screen w-full snap-center flex-col items-center justify-center py-10"
    >
      {children}
    </section>
  )
}

const CardProject = ({ title, description, image, link }: any) => {
  return (
    <article className="relative flex h-full w-[340px] max-w-full shrink-0 snap-center flex-col items-center justify-center rounded-md px-2 py-2 first:pl-4 md:w-96">
      <img
        className="absolute z-[5] h-full w-full rounded-md object-cover"
        src={image}
        alt={title}
      />
      <span className="absolute z-[6] h-full w-full rounded-md bg-black bg-opacity-75 object-cover"></span>
      <div className="relative z-20 flex flex-col items-center justify-center">
        <h3 className="text-center text-xl text-white">{title}</h3>
        <p className="text-white text-opacity-50">{description}</p>
      </div>
    </article>
  )
}

const Bubbles = ({ scene }: any) => {
  return (
    <div className="relative top-0 left-0 h-full w-full">
      {scenes[scene].bubbles.map((bubble, index) => (
        <motion.span
          key={index}
          itemID={`bubble-${index}`}
          className="absolute z-0 bg-[#261c48] opacity-[60%]"
          style={{
            borderRadius: '100%',
          }}
          animate={{
            top: `${bubble.y}%`,
            left: `${bubble.x}%`,
            width: `${bubble.width}`,
            height: `${bubble.width}`,
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        ></motion.span>
      ))}
    </div>
  )
}
