import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { generateRadius } from '../libs/generateRadius'

const Bubble = ({ bubble, index }: any) => {
  return (
    <motion.span
      key={index}
      itemID={`bubble-${index}`}
      className="absolute z-0 opacity-[70%]"
      animate={{
        width: `400px`,
        height: `400px`,
        background: `linear-gradient(90deg, hsla(${bubble.bgColors[0]}) 0%, hsla(${bubble.bgColors[1]}) 100%)`,
        top: `${bubble.y * 7}px`,
        left: `${bubble.x * 15}px`,
        borderRadius: generateRadius(10, 100),
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}
    ></motion.span>
  )
}

export default Bubble
