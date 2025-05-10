"use client";
import React from "react";
import { motion } from "framer-motion";
import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import Woman from '@/public/woman.png'
import Hands from '@/public/hands.png'

interface ChatDetailsProps {
  chatDetailsData: {
    photos: Array<{
      id: string;
      type: string;
      duration?: string;
    }>;
    files: Array<{
      id: string;
      name: string;
    }>;
    links: Array<{
      id: string;
      title: string;
      url: string;
      gradient?: {
        from: string;
        to: string;
      };
    }>;
  };
  onClose: () => void;
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ chatDetailsData, onClose }) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "400px", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
      }}
      className="h-screen bg-sidebar-bg w-[400px] overflow-y-auto flex-shrink-0"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 py-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Chat Details</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Photos and Videos - Staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">
              Photos and Videos ({chatDetailsData.photos.length})
            </h4>
            <button className="text-sm text-gray-400 hover:text-white">
              See more
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {chatDetailsData.photos.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
              >
                <Image
                  src={item.type === "photo" ? Hands : Woman}
                  alt={item.type === "photo" ? "Hands" : "Woman"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
                />
                {item.type === "video" && item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shared Files - Staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">
              Shared Files ({chatDetailsData.files.length})
            </h4>
            <button className="text-sm text-gray-400 hover:text-white">
              See more
            </button>
          </div>
          <div className="space-y-3">
            {chatDetailsData.files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
              >
                <FileText className="h-6 w-6 text-purple-400" />
                <span className="text-sm truncate">{file.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shared Links - Staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">
              Shared Links ({chatDetailsData.links.length})
            </h4>
            <button className="text-sm text-gray-400 hover:text-white">
              See more
            </button>
          </div>
          <div className="space-y-3">
            {chatDetailsData.links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-900 rounded-lg"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: link.gradient
                      ? `linear-gradient(to br, ${link.gradient.from}, ${link.gradient.to})`
                      : "linear-gradient(to br, #9747FF, #FF47E0)",
                  }}
                >
                  <div className="w-8 h-8 bg-white rounded" />
                </div>
                <div>
                  <p className="text-sm">{link.title}</p>
                  <p className="text-xs text-gray-400">{link.url}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatDetails;