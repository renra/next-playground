'use client'

import { DevTools } from 'jotai-devtools';

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'

const countAtom = atom(0)

const [randomDogAtom, statusAtom] = atomsWithQuery((get) => ({
  queryKey: ['random-dog'],
  queryFn: async () => {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
    return res.json()
  },
}))

export const Incrementor = () => {
  const setCount = useSetAtom(countAtom)
  console.log(`Incrementor re-rendering`)

  return (
    <button onClick={() => { setCount((c) => c + 1) }}>
      Click me to increment
    </button>
  )
}

export const Shower = () => {
  const count = useAtomValue(countAtom)
  console.log(`Shower re-rendering`)

  return (
    <div>
      The current count is: {count}
    </div>
  )
}

export default function Home() {
  console.log(`Home re-rendering`)

  const randomDog = useAtomValue(statusAtom)

  console.log(randomDog)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DevTools />
      Hello World!

      <Incrementor />
      <Shower />
    </main>
  )
}
