'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/login');
  }, [router]);

  return (
    <div className="flex text-[#fff] bg-[#000] h-screen w-full items-center justify-center">
      <p>Starting Cardlect...</p>
    </div>
  );
}
