import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 flex h-fit w-[200px] flex-col gap-10 border-r border-black/10 p-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            <Image src="/logo.png" alt="Moody.Ai Logo" width={40} height={40} />
          </div>
          <span className="font-bold italic">Moody.Ai</span>
          <div className="h-5 w-5">
            <Image src="/logo.png" alt="Moody.Ai Logo" width={40} height={40} />
          </div>
        </div>
        <div className="mt-6">
          <ul className="px-4">
            {links.map(link => (
              <li
                key={link.name}
                className="mb-4 py-4 text-xl font-bold italic text-gray-500 hover:text-black hover:underline"
              >
                <Link href={link.href}>{`<- ${link.name}`}</Link>
              </li>
            ))}
          </ul>
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
