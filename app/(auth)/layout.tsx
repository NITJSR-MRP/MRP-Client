"use client";

import ThemeToggle from '@/components/custom/ThemeToggle';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-200 relative">
            {/* Top Left Navigation Button */}
            <button
                onClick={() => router.push('/')}
                className="absolute top-4 left-4 z-50 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm backdrop-blur-md transition-all group"
            >
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Home
            </button>

            {/* Top Right Theme Toggle */}
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Left Showcase Banner */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950/40 border-r border-zinc-200 dark:border-zinc-800/80">
                {/* Subtle Ambient Background Gradients / Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="p-12 max-w-lg flex flex-col justify-center items-center text-center relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/10 text-white border border-white/20 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60 backdrop-blur-sm">
                        🎓 NIT Jamshedpur • MCA
                    </div>
                    <h2 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        Welcome to MRP
                    </h2>
                    <p className="text-base text-blue-100 dark:text-zinc-400 font-normal leading-relaxed">
                        Share and explore real interview experiences, company trends, and placement records of your seniors.
                    </p>
                </div>
            </div>

            {/* Right Form Area */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 pt-16 lg:pt-8 bg-zinc-50 dark:bg-black">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;