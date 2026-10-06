// src/components/LogItem.jsx
export default function LogItem({ log, isEditing, onEdit, onDelete }) {
  return (
    <div
      className={`border-l-4 ${
        isEditing
          ? "border-green-500 bg-green-50"
          : "border-blue-500 bg-gray-50"
      } pl-4 py-3 rounded-r-lg shadow-sm transition-colors`}
    >
      <div className="flex justify-between items-start">
        {/* Bagian Kiri: Detail Kegiatan */}
        <div>
          <h3 className="font-bold text-lg text-gray-800">{log.kegiatan}</h3>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full mt-2 inline-block">
            {log.kategori}
          </span>
          {log.catatan && (
            <p className="text-gray-600 mt-2 text-sm whitespace-pre-wrap">
              {log.catatan}
            </p>
          )}
        </div>

        {/* Bagian Kanan: Tanggal & Tombol (Diperbarui dengan min-w-32) */}
        <div className="flex flex-col items-end gap-2 ml-4 min-w-32">
          <span className="text-sm text-gray-500 font-medium bg-white px-2 py-1 rounded shadow-sm">
            {log.tanggal}
          </span>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => onEdit(log)}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-100 px-3 py-1 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(log.id)}
              className="text-red-600 hover:text-red-800 text-sm font-semibold bg-red-100 px-3 py-1 rounded-md transition"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
