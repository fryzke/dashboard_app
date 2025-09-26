"use client";

import { useUIStore } from "../store";

export default function NavigationDrawer() {
  const { isDrawerOpen, closeDrawer } = useUIStore();

  return (
    <div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeDrawer}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform 
        transition-transform duration-300 ease-in-out
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
        </div>
        <ul className="p-4 space-y-2">
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Dashboard</li>
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Settings</li>
        </ul>
      </div>
    </div>
  );
}