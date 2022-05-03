import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingIcon from './icons/Loading'

export default function TaxesDemo() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => {
        setStep(2)
      }, 5000)
    }

    if (step === 2) {
      setTimeout(() => {
        setStep(3)
      }, 5000)
    }
  }, [step])

  return (
    <div className="relative my-2 flex h-full w-full flex-col items-center justify-center">
      {/* <button
        className="absolute -bottom-10 w-fit rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => setStep(0)}
      >
        Reset
      </button> */}
      {step === 0 && (
        <div className="absolute flex w-full flex-col items-center justify-center gap-4">
          <h4 className="text-xl font-bold">Start demo</h4>
          <button
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-black bg-transparent py-2 px-4 font-bold text-black transition duration-200 hover:bg-white hover:text-black dark:border-white dark:text-white "
            onClick={async () => {
              setLoading(true)
              await delay(2000)
              setLoading(false)
              setStep(1)
            }}
          >
            {loading ? (
              <>
                <LoadingIcon /> Uploading...
              </>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      )}
      <AnimatePresence>
        {step === 1 && (
          <div className="absolute flex w-full flex-col items-center justify-center gap-4">
            <motion.h4
              className="inline-flex items-center gap-2 text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingIcon /> Analyzing the document...
            </motion.h4>

            <motion.span
              className="relative h-80 w-52 rounded-lg bg-gray-200 bg-opacity-25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 200 }}
              transition={{ duration: 0.5 }}
            >
              <motion.hr
                className="absolute top-0 left-0 h-full w-full border-t-4 border-blue-700"
                animate={{
                  top: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  ease: 'easeInOut',
                  loop: Infinity,
                  repeatDelay: 0,
                }}
              />
              <h6 className="absolute top-0 left-0 p-4 text-left text-3xl font-bold text-blue-500 opacity-20">
                300
              </h6>
              <h6 className="absolute flex h-full w-full flex-col justify-center p-4 text-center text-3xl font-bold text-white opacity-20">
                AEAT
              </h6>
            </motion.span>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            className="absolute flex w-full flex-col items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-bold">Raw data</h4>
            <motion.span
              className="relative h-full w-52 rounded-lg bg-gray-200 bg-opacity-25"
              initial={{ opacity: 0, x: -200 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.5, ease: 'easeInOut' },
              }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <pre className="p-2 font-mono text-sm">
                Model: 300
                <br />
                Tax: AEAT
                <br />
                Company ID: 12345678
                <br />
                VAT: ES12345678Z
                <br />
                Date: 2020-01-01
                <br />
                Name: Acme Inc.
                <br />
                Income taxes: 210.000
                <br />
                Purchases taxes: 400.000
                <br />
                Total: 190.000
              </pre>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            className="absolute flex w-full flex-col items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.5, ease: 'easeInOut' },
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h4 className="text-xl font-bold">Formatted Result</h4>
            <motion.span
              className="relative h-full w-fit rounded-lg bg-gray-200 bg-opacity-25"
              initial={{ opacity: 0, x: -200 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 1, ease: 'easeInOut' },
              }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            >
              <pre className="p-2 font-mono text-sm">
                {JSON.stringify(
                  {
                    model: '300',
                    tax: 'AEAT',
                    companyId: '12345678',
                    vat: 'ES12345678Z',
                    date: '2020-01-01',
                    name: 'Acme Inc.',
                    incomeTaxes: '210.000',
                    purchasesTaxes: '400.000',
                    total: '190.000',
                  },
                  null,
                  2
                )}
              </pre>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
