import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-black p-24">
      <div className="mx-auto w-full max-w-[666px]">
        <h1 className="mb-6 text-6xl font-bold text-white">
          The Best Journal App, period.
        </h1>
        <p className="mb-6 text-2xl text-white/75">
          Best App to track your mood throught out your life. All you have to do
          is be honest !
        </p>
        <div>
          <Link href="/journal">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-xl text-white ">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
