// src/App.jsx
import { useState, useEffect } from "react";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";

export default function App() {
  const [logs, setLogs] = useState(() => {
    const dataTersimpan = localStorage.getItem("data_logbook");
    return dataTersimpan ? JSON.parse(dataTersimpan) : [];
  });
  const [editItem, setEditItem] = useState(null); // Menyimpan 1 blok data yang sedang diedit

  useEffect(() => {
    localStorage.setItem("data_logbook", JSON.stringify(logs));
  }, [logs]);

  // Fungsi memproses data dari form
  const handleSave = (dataDariForm) => {
    if (editItem) {
      // Proses Update
      const logsDiperbarui = logs.map((log) =>
        log.id === editItem.id ? { ...log, ...dataDariForm } : log,
      );
      setLogs(logsDiperbarui);
      setEditItem(null);
    } else {
      // Proses Tambah Baru
      const logBaru = {
        id: Date.now(),
        tanggal: new Date().toLocaleDateString("id-ID"),
        ...dataDariForm,
      };
      setLogs([logBaru, ...logs]);
    }
  };

  const handleDelete = (id) => setLogs(logs.filter((log) => log.id !== id));
  const handleEdit = (log) => setEditItem(log);
  const handleCancelEdit = () => setEditItem(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Log Book App</h1>
        <p className="text-gray-600 mb-8">Aplikasi pencatat kegiatan harian.</p>

        {/* Panggil komponen-komponen, lalu lempar data (Props) ke dalamnya */}
        <LogForm
          onSave={handleSave}
          editItem={editItem}
          onCancel={handleCancelEdit}
        />

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Riwayat Kegiatan
          </h2>
          <LogList
            logs={logs}
            editId={editItem?.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
