// src/components/LogList.jsx
import LogItem from "./LogItem";

export default function LogList({ logs, editId, onEdit, onDelete }) {
  if (logs.length === 0) {
    return (
      <p className="text-gray-500 italic text-center py-4">
        Belum ada kegiatan yang dicatat. Mari mulai produktif hari ini!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {logs.map((log) => (
        <LogItem
          key={log.id}
          log={log}
          isEditing={editId === log.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
