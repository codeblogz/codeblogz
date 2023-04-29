import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div className="text-5xl w-full h-full flex items-center justify-center bg-black text-white">hello world!</div>
  )
}
