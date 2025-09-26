"use client";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { Post, useAppStore } from "../store";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Modal from "./Modal";

interface ChartRenderProps {
  companyId: string;
}

export default function ChartRender({ companyId }: ChartRenderProps) {
  const { companies, posts, loading, fetchData } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (companies.length === 0 || posts.length === 0) {
      fetchData();
    }
  }, [companies, posts, fetchData]);

  if (loading) return (<div className="flex justify-center items-center h-screen">
           <Image
              src="/loading.gif"
              width={100}
              height={100}
              alt="Loading"
              unoptimized
                     />
          </div>);

  const company = companies.find((c) => c.id === companyId);
  if (!company) return <p>Company not found</p>;

  const chartData = company.emissions.map((e) => {
    const monthPosts = posts.filter(
      (p) => p.resourceUid === companyId && p.dateTime === e.yearMonth
    );
    return {
      name: e.yearMonth,
      emissions: e.emissions,
      posts: monthPosts,
    };
  });

  return (
    <div className="bg-white p-4 rounded shadow w-[95%] min-h-[300px] h-full m-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">
          {company.name} CO2 Emissions
        </h3>
        <button
          onClick={() => {
            setSelectedPost(null);
            setIsModalOpen(true);
          }}
          className="px-2 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          + Post
        </button>
      </div>

      <div className="flex flex-col  md:flex-row gap-4">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="emissions" fill="#8884d8" />
          <Line type="monotone" dataKey="emissions" stroke="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="bg-white w-full border p-4 shadow">
        {posts.length > 0 ? (
          <div>
            {posts
              .filter((p) => p.resourceUid === companyId)
              .map((p) => (
                <div key={p.id} className="border-b pb-1">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.dateTime}</p>
                  <p className="text-sm">{p.content}</p>
                  <div className="flex justify-end"><button
                  onClick={() => {
                    setSelectedPost(p);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  edit
                </button></div>

                </div>
                
              ))}
          </div>
        ) : (
          <p>No posts</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyId={company.id}
        chartMonths={company.emissions.map((e) => e.yearMonth)}
        postId={selectedPost?.id}
      />


      </div>
    </div>
  );
}
