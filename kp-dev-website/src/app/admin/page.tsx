"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.topic || !formData.description) {
      showToast("Please fill in all fields", "error");
      return;
    }

    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("description", formData.description);
    if (file) {
      data.append("file", file);
    }

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        showToast("✓ Roadmap entry added successfully!", "success");
        setFormData({ topic: "", description: "" });
        setFile(null);
      } else {
        const d = await res.json();
        showToast(d.error || "Failed to add roadmap entry", "error");
      }
    } catch {
      showToast("Failed to connect to server.", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Back Navigation */}
      <div className="relative z-10 pt-8 px-8">
        <Link
          href="/"
          className="font-mono text-xs text-white/50 hover:text-white tracking-[0.2em] uppercase transition-colors border-b border-white/10 pb-1"
        >
          ← cd ../HOME
        </Link>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-12">
        <h1 className="text-6xl font-bebas text-white tracking-widest uppercase leading-none">
          ADMIN DASHBOARD
        </h1>
      </div>

      {/* Upload Form */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 pb-24">
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="font-bebas text-2xl text-white tracking-wider mb-6">ADD ROADMAP ENTRY</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic */}
            <div>
              <label className="font-mono text-xs text-white/50 tracking-widest uppercase mb-2 block">
                TOPIC
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-white/30 focus:outline-none transition-colors"
                placeholder="Enter topic..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-mono text-xs text-white/50 tracking-widest uppercase mb-2 block">
                DESCRIPTION
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-white/30 focus:outline-none transition-colors resize-none"
                rows={4}
                placeholder="Enter description..."
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="font-mono text-xs text-white/50 tracking-widest uppercase mb-2 block">
                UPLOAD FILE (PDF/IMAGE)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-white/20 rounded-lg px-4 py-8 cursor-pointer hover:border-white/40 transition-colors"
                >
                  {file ? (
                    <div className="flex items-center gap-2 text-white">
                      <FileText size={20} />
                      <span className="font-mono text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                        className="ml-auto hover:text-red-400 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/40">
                      <Upload size={20} />
                      <span className="font-mono text-sm">Click to upload PDF or image</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1a6b3c] hover:bg-[#1a6b3c]/80 text-white font-mono text-xs tracking-[0.2em] uppercase py-4 rounded-lg transition-colors"
            >
              ADD TO ROADMAP
            </button>
          </form>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-6 right-6 z-[500] px-6 py-4 rounded-xl font-mono text-sm tracking-wider shadow-2xl transition-all duration-500 ${
              toast.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                : "bg-red-500/20 border border-red-500/40 text-red-300"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </main>
  );
}
