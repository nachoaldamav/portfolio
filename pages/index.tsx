import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Bubble from '../components/bubble'
import ArrowDownIcon from '../components/icons/ArrowDown'
import MoonIcon from '../components/icons/Moon'
import SunIcon from '../components/icons/Sun'
import TaxesDemo from '../components/taxesForm'
import useIntersection from '../hooks/useIntersection'
import projectList from '../utils/projects'

const scenes = [
  {
    id: 0,
    title: 'Home',
    link: 'home',
    bubbles: [
      {
        x: -10,
        y: -10,
        width: '25rem',
        bgColors: ['252, 40%, 29%, 1', '270, 77%, 71%, 1'],
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
    link: 'about',
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
    link: 'projects',
    bubbles: [
      {
        x: 0,
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
  {
    id: 3,
    title: 'Projects',
    link: 'key-project',
    bubbles: [
      {
        x: 60,
        y: 0,
        width: '35rem',
        bgColors: ['347, 89%, 61%, 1', '242, 42%, 40%, 1'],
      },
      {
        x: -10,
        y: 50,
        width: '30rem',
        bgColors: ['242, 42%, 40%, 1', '347, 89%, 61%, 1'],
      },
    ],
  },
  {
    id: 4,
    title: 'Contact',
    link: 'contact',
    bubbles: [
      {
        x: -10,
        y: -10,
        width: '25rem',
        bgColors: ['252, 40%, 29%, 1', '270, 77%, 71%, 1'],
      },
      {
        x: 80,
        y: 65,
        width: '30rem',
        bgColors: ['252, 40%, 29%, 1', '270, 77%, 71%, 1'],
      },
    ],
  },
]

export default function Home() {
  const { theme, setTheme } = useTheme()
  // Disable for server
  if (typeof window === 'undefined') return null

  const [currentScene, setCurrentScene] = useState(0)

  // Detect wheel event
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      nextScene()
    } else {
      prevScene()
    }
  })

  window.onkeyup = (e) => {
    if (e.key === 'ArrowDown') {
      nextScene()
    } else if (e.key === 'ArrowUp') {
      prevScene()
    }
  }

  function prevScene() {
    if (currentScene > 0) {
      const id = scenes[currentScene - 1].link
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function nextScene() {
    if (currentScene < scenes.length - 1) {
      const id = scenes[currentScene + 1].link
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main className="flex min-h-screen snap-y snap-mandatory flex-col bg-white transition duration-300 dark:bg-black">
      <button
        className="group fixed top-5 right-5 z-50 cursor-pointer rounded-lg border-2 border-gray-400 p-2 hover:bg-white hover:text-black dark:bg-black dark:text-white md:right-10"
        onClick={() => {
          const nextTheme = theme === 'light' ? 'dark' : 'light'
          setTheme(nextTheme)
        }}
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      {scenes[currentScene - 1] !== undefined && (
        <button
          onClick={() => {
            // Go to the next scene
            const nextScene = currentScene - 1
            const id = scenes[nextScene]?.link || 'home'
            const element = document.getElementById(id)

            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="fixed bottom-20 right-10 z-50 rotate-180 cursor-pointer rounded-lg border-2 p-2 transition duration-200 hover:bg-white hover:text-black dark:text-white dark:hover:text-black"
        >
          <ArrowDownIcon />
        </button>
      )}
      {scenes[currentScene + 1] !== undefined && (
        <button
          onClick={() => {
            // Go to the next scene
            const nextScene = currentScene + 1
            const id = scenes[nextScene]?.link || 'home'
            const element = document.getElementById(id)

            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="fixed bottom-5 right-10 z-50 cursor-pointer rounded-lg border-2 p-2 transition duration-200 hover:bg-white hover:text-black dark:text-white dark:hover:text-black"
        >
          <ArrowDownIcon />
        </button>
      )}
      <div className="fixed top-0 left-0 h-screen w-full">
        <span className="absolute top-0 left-0 z-10 h-screen w-full bg-opacity-70 bg-clip-padding p-10 backdrop-blur-[100px] backdrop-filter"></span>
        <Bubbles scene={currentScene} />
      </div>
      <div className="z-20 h-screen w-full snap-y snap-mandatory overflow-hidden overflow-x-hidden">
        <HomeSection
          id="home"
          scene={0}
          setScene={setCurrentScene}
          currentScene={currentScene}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl text-black dark:text-white">
              <span className="font-semibold text-opacity-75">Hello, I'm </span>
              <span className="font-bold text-opacity-50">Nacho</span>
            </h1>
            <p className="text-black text-opacity-50 dark:text-gray-400">
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
          <div className="mx-10 flex w-full flex-col items-center justify-center px-10 md:w-2/3 md:px-0 lg:w-1/2 xl:w-1/3">
            <h2 className="text-xl text-black dark:text-white">
              <span className="font-semibold text-opacity-75">
                I'm a junior full-stack developer
              </span>
            </h2>
            {/* Add languages */}
            <p className="mt-2 text-black text-opacity-50 dark:text-gray-400">
              In 2019 I started my journey as a developer, and I've been
              learning and growing every day.
            </p>
            <p className="mt-2 text-black text-opacity-50 dark:text-gray-400">
              Up until now I've been working with JavaScript, React and Node.js
              to create some websites like a video chat app, an appointment
              management tool and a live score app for OBS.
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
            <h2 className="text-xl text-black dark:text-white">
              <span className="text-3xl font-semibold text-opacity-75">
                Projects
              </span>
            </h2>
            <div className="sc1 relative my-10 mx-10 flex h-64 w-3/4 transform snap-x items-center gap-10 overflow-x-auto py-4 transition duration-300 ease-in-out md:mx-0 md:w-2/4">
              <div className="shrink-0 snap-center">
                <div className="w-28 shrink-0 sm:w-96"></div>
              </div>
              {projectList.map((project, index) => (
                <CardProject
                  title={project.name}
                  description={project.description}
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
        <HomeSection
          id="key-project"
          scene={3}
          setScene={setCurrentScene}
          currentScene={currentScene}
        >
          <div className="mx-10 flex h-full w-full flex-col items-center md:mx-0 md:w-4/5">
            <h2 className="text-3xl text-black dark:text-white">
              Key
              <span className="font-bold text-opacity-75"> Project</span>
            </h2>
            <p className="mt-2 text-center text-black dark:text-gray-400 md:w-1/2">
              This is a demostration of my favourite project.
            </p>
            <p className="mt-2 text-center text-black dark:text-gray-400 md:w-1/2">
              It's an AI that can extract information from a spanish taxes
              document and return it as a JSON.
            </p>
            <TaxesDemo />
          </div>
        </HomeSection>
        <HomeSection
          id="contact"
          scene={4}
          setScene={setCurrentScene}
          currentScene={currentScene}
        >
          <div className="mx-10 flex w-full flex-col items-center justify-center md:mx-0 md:w-1/2">
            <h2 className="text-xl text-black dark:text-white">
              <span className="text-3xl font-semibold text-opacity-75">
                Contact
              </span>
            </h2>
            <form
              className="mt-2 flex w-full flex-col"
              onSubmit={(e) => {
                e.preventDefault()
                console.log('submit')
              }}
            >
              <label className="text-black text-opacity-50 dark:text-gray-400">
                Name
              </label>
              <input
                className="my-2 w-full rounded-md border-2 border-gray-400 p-2 focus:outline-none dark:bg-black"
                type="text"
                placeholder="John Doe"
              />
              <label className="text-black text-opacity-50 dark:text-gray-400">
                Email
              </label>
              <input
                className="my-2 w-full rounded-md border-2 border-gray-400 p-2 focus:outline-none dark:bg-black"
                type="email"
                placeholder="john.doe@example.com"
              />
              <label className="text-black text-opacity-50 dark:text-gray-400">
                Message
              </label>
              <textarea
                className="my-2 w-full rounded-md border-2 border-gray-400 p-2 focus:outline-none dark:bg-black"
                placeholder="Hi, I'm interested in working with you."
              />
              <button
                className="my-2 w-full rounded-md border-2 border-gray-400 p-2 focus:outline-none dark:bg-black"
                type="submit"
              >
                Send
              </button>
            </form>
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
        <h3 className="text-center text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="font-light text-white text-opacity-50">{description}</p>
      </div>
    </article>
  )
}

const Bubbles = ({ scene }: any) => {
  return (
    <div className="relative top-0 left-0 h-full w-full">
      {scenes[scene].bubbles.map((bubble, index) => (
        <Bubble key={index} index={index} bubble={bubble} />
      ))}
    </div>
  )
}
