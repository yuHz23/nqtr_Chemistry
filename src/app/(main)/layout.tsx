import { Sidebar } from "@/components/ui/Sidebar";
import { MobileNav } from "@/components/ui/MobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full pb-16 md:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
