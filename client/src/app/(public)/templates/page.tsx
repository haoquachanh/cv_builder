"use client";

import { FaDownload, FaStar, FaEye } from "react-icons/fa";
import Image from "next/image";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description:
      "Clean and contemporary design perfect for tech and creative fields",
    downloads: "2.3k",
    rating: 4.8,
    views: "12k",
    image: "/preview-cv.png", // Using default preview image temporarily
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Stand out with this bold and innovative layout",
    downloads: "1.8k",
    rating: 4.7,
    views: "10k",
    image: "/preview-cv.png", // Using default preview image temporarily
  },
  {
    id: "minimal",
    name: "Clean Minimal",
    description: "Simple and elegant design that lets your content shine",
    downloads: "1.5k",
    rating: 4.6,
    views: "8k",
    image: "/preview-cv.png", // Using default preview image temporarily
  },
  {
    id: "compact",
    name: "Compact Professional",
    description:
      "Space-efficient design that fits more content while maintaining readability",
    downloads: "1.4k",
    rating: 4.6,
    views: "7.5k",
    image: "/preview-cv.png", // Using default preview image temporarily
  },
  {
    id: "classic",
    name: "Classic Executive",
    description:
      "Traditional layout perfect for corporate and business professionals",
    downloads: "1.2k",
    rating: 4.5,
    views: "7k",
    image: "/preview-cv.png", // Using default preview image temporarily
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">CV Templates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={template.image}
                alt={template.name}
                className="object-cover"
                fill
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900">
                {template.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {template.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FaDownload className="w-4 h-4 mr-1" />
                    {template.downloads}
                  </span>
                  <span className="flex items-center">
                    <FaEye className="w-4 h-4 mr-1" />
                    {template.views}
                  </span>
                  <span className="flex items-center">
                    <FaStar className="w-4 h-4 mr-1 text-yellow-400" />
                    {template.rating}
                  </span>
                </div>

                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
