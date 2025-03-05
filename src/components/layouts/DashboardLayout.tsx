import { Leftbar, NavBar } from '@/components/organisms'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Leftbar />
      <main className="flex flex-1 flex-col">
        <NavBar />
        <section className="relative flex min-h-[calc(100vh-68px)] flex-1 flex-col bg-[#F9F9F9] p-4 md:p-6 lg:min-h-0 lg:p-7">
          {children}
        </section>
      </main>
    </div>
  )
}
