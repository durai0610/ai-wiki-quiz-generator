import React from "react";

export default function HistoryTable({ rows = [], onShowDetails }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Title</th>
            <th className="py-2 px-3">URL</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500">
                No history found.
              </td>
            </tr>
          )}

          {rows.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="py-3 px-3">{r.id}</td>
              <td className="py-3 px-3 font-medium">{r.title ?? "-"}</td>
              <td className="py-3 px-3 text-xs text-blue-600 break-all">
                <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a>
              </td>
              <td className="py-3 px-3 text-gray-500">
                {r.date_generated
                ? new Date(r.date_generated + "Z").toLocaleString("en-IN", { hour12: true })
                : "-"}
              </td>
              <td className="py-3 px-3">
                <button
                  onClick={() => onShowDetails(r.id)}
                  className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {rows.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No history found.
          </div>
        )}

        {rows.map((r) => (
          <div
            key={r.id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">ID:</span> {r.id}
            </div>

            <div className="text-gray-800 font-semibold mb-1">
              {r.title ?? "-"}
            </div>

            <div className="text-xs text-blue-600 break-all mb-2">
              <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a>
            </div>

            <div className="text-gray-500 text-xs mb-3">
              {r.date_generated
                ? new Date(r.date_generated + "Z").toLocaleString("en-IN", { hour12: true })
                : "-"}
            </div>
            <button
              onClick={() => onShowDetails(r.id)}
              className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
