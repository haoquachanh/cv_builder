"use client";

import { useState } from "react";
import { FaFilePdf, FaEye, FaDownload } from "react-icons/fa";

interface HistoryItem {
  id: string;
  date: string;
  action: string;
  cvName: string;
  cvId: string;
}

export default function HistoryPage() {
  const [history] = useState<HistoryItem[]>([
    {
      id: "1",
      date: "2025-06-18 14:32",
      action: "Downloaded",
      cvName: "Frontend Developer CV",
      cvId: "cv1",
    },
    {
      id: "2",
      date: "2025-06-17 10:45",
      action: "Created",
      cvName: "Backend Developer CV",
      cvId: "cv2",
    },
    {
      id: "3",
      date: "2025-06-15 16:22",
      action: "Edited",
      cvName: "Frontend Developer CV",
      cvId: "cv1",
    },
    {
      id: "4",
      date: "2025-06-12 09:30",
      action: "Downloaded",
      cvName: "Full Stack Developer CV",
      cvId: "cv3",
    },
    {
      id: "5",
      date: "2025-06-10 11:15",
      action: "Created",
      cvName: "Frontend Developer CV",
      cvId: "cv1",
    },
  ]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Downloaded":
        return <FaDownload className="text-blue-600" />;
      case "Created":
        return <FaFilePdf className="text-green-600" />;
      case "Edited":
        return <FaEye className="text-purple-600" />;
      default:
        return <FaFilePdf className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Activity History
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date & Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CV
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                      {getActionIcon(item.action)}
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">
                      {item.action}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  {item.cvName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
