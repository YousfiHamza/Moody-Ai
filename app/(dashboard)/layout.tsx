import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 flex h-fit w-[200px] items-center gap-3 border-r border-black/10 p-6">
        <div className="h-5 w-5">
          <Image src="/logo.png" alt="Moody.Ai Logo" width={40} height={40} />
        </div>
        <span className="font-bold italic">Moody.Ai</span>
        <div className="h-5 w-5">
          <Image src="/logo.png" alt="Moody.Ai Logo" width={40} height={40} />
        </div>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <main className="h-[calc(100%-60px)]">{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;
