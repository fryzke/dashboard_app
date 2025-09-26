"use client";
import Image from 'next/image'
import { useEffect } from "react";
import { useCompanyStore } from "./store";
import { useUIStore } from "./store";
import SideBar from "./components/SideBar";
import Tabs from "./components/TabList";

export default function Home() {
  const { loading, fetchAll } = useCompanyStore();
  const { toggleDrawer } = useUIStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="App flex-col">
      <SideBar />
      <header className="flex items-center p-4 text-white">
          <button
            className="px-4 py-2 bg-gray-800 rounded"
            onClick={toggleDrawer}
          >
            ☰
          </button>
          <div className="flex text-3xl font-bold text-white mx-8 mb-4 pt-4">
        	Dashboard
	        </div>
      </header>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Image
            src="/loading.gif"
            width={100}
            height={100}
            alt="Loading"
            unoptimized
          />
        </div>
      ) : (
        <div className="relative flex-col grow">
          <div className="relative flex grow z-0">
            <div className="h-full w-full mx-16 mt-4">
              <Tabs/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}