import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import useIntersection from '../hooks/useIntersection'

const randomRadius = () => Array.from({ length: 4 }, () => Math.random() * 100)

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
        bgColors: ['252, 40%, 29%, 1', '270, 77%, 71%, 1'],
        radius: `${randomRadius().join('% ')}`,
      },
      {
        x: 80,
        y: 65,
        width: '30rem',
        bgColors: ['252, 40%, 29%, 1', '270, 77%, 71%, 1'],
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
        bgColors: ['270, 94%, 25%, 1', '158, 94%, 49%, 1'],
      },
      {
        x: -10,
        y: 30,
        width: '35rem',
        bgColors: ['158, 94%, 49%, 1', '270, 94%, 25%, 1'],
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
        bgColors: ['191, 75%, 60%, 1', '248, 87%, 36%, 1'],
      },
      {
        x: 60,
        y: -10,
        width: '30rem',
        bgColors: ['248, 87%, 36%, 1', '191, 75%, 60%, 1'],
      },
    ],
  },
]

export default function Home() {
  // Disable for server
  if (typeof window === 'undefined') return null

  const [currentScene, setCurrentScene] = useState(0)

  return (
    <main className="flex min-h-screen snap-y snap-proximity flex-col bg-black">
      <div className="fixed top-0 left-0 h-screen w-full">
        <span className="absolute top-0 left-0 z-10 h-screen w-full bg-opacity-70 bg-clip-padding p-10 backdrop-blur-[100px] backdrop-filter"></span>
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
          <div className="mx-10 flex w-full flex-col items-center justify-center md:w-2/3 lg:w-1/2 xl:w-1/3">
            <h2 className="text-xl text-white">
              <span className="font-semibold text-opacity-75">
                I'm a junior full-stack developer
              </span>
            </h2>
            {/* Add languages */}
            <p className="mt-2 text-white text-opacity-50">
              In 2019 I started my journey as a developer, and I've been
              learning and growing every day.
            </p>
            <p className="mt-2 text-white text-opacity-50">
              Up until now I've been working with JavaScript, React and Node.js
              to create some websites like a video chat app or an appointment
              management tool.
            </p>
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
  const inViewport = useIntersection(ref, '-50px')

  useEffect(() => {
    if (inViewport) {
      setScene(scene)
      console.log(scene)
    }
  }, [scene, inViewport])

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
  //bg-[#261c48]

  return (
    <div className="relative top-0 left-0 h-full w-full">
      {scenes[scene].bubbles.map((bubble, index) => (
        <Bubble key={index} index={index} bubble={bubble} />
      ))}
    </div>
  )
}

const Bubble = ({ bubble, index }: any) => {
  return (
    <motion.span
      key={index}
      itemID={`bubble-${index}`}
      className="absolute z-0 opacity-[70%]"
      style={{
        borderRadius: `${(randomPercentage + '% ').repeat(4)}`,
      }}
      animate={{
        width: `400px`,
        height: `400px`,
        background: `linear-gradient(90deg, hsla(${bubble.bgColors[0]}) 0%, hsla(${bubble.bgColors[1]}) 100%)`,
        top: `${bubble.y * 7}px`,
        left: `${bubble.x * 15}px`,
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}
    ></motion.span>
  )
}

function randomPercentage() {
  return (Math.random() * 100).toString()
}
