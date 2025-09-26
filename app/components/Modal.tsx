"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "../store";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  chartMonths: string[];
  postId?: string;
}

export default function PostModal({ isOpen, onClose, companyId, chartMonths, postId }: PostModalProps) {
  const { posts, savePost } = useAppStore();
  const [title, setTitle] = useState("");
  const [yearMonth, setYearMonth] = useState(chartMonths[0] || "");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (!postId) {
      setTitle("");
      setYearMonth(chartMonths[0] || "");
      setContent("");
      return;
    }
    
    const existing = posts.find(p => p.id === postId && p.resourceUid === companyId);
    if (existing) {
      setTitle(existing.title);
      setYearMonth(existing.dateTime);
      setContent(existing.content);
    }
  }, [isOpen, postId, chartMonths, companyId, posts]);

  const handleSave = async () => {
    if (!title || !content || !yearMonth) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await savePost({
        id: postId,
        title,
        content,
        dateTime: yearMonth,
        resourceUid: companyId,
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save post. Try again");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{postId ? "Edit Post" : "Add Post"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />

        <select
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        >
          {chartMonths.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}