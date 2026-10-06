// src/App.jsx
import { useState, useEffect } from "react";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";

export default function App() {
  const [logs, setLogs] = useState(() => {
    const dataTersimpan = localStorage.getItem("data_logbook");
    return dataTersimpan ? JSON.parse(dataTersimpan) : [];
  });
  const [editItem, setEditItem] = useState(null);

  // 1. STATE UNTUK PENCARIAN
  const [kataKunci, setKataKunci] = useState("");

  useEffect(() => {
    localStorage.setItem("data_logbook", JSON.stringify(logs));
  }, [logs]);

  const handleSave = (dataDariForm) => {
    if (editItem) {
      const logsDiperbarui = logs.map((log) =>
        log.id === editItem.id ? { ...log, ...dataDariForm } : log,
      );
      setLogs(logsDiperbarui);
      setEditItem(null);
    } else {
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

  // 2. LOGIKA PENYARING DATA
  const logsYangDitampilkan = logs.filter(
    (log) =>
      log.kegiatan.toLowerCase().includes(kataKunci.toLowerCase()) ||
      log.kategori.toLowerCase().includes(kataKunci.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Log Book App</h1>
        <p className="text-gray-600 mb-8">Aplikasi pencatat kegiatan harian.</p>

        <LogForm
          onSave={handleSave}
          editItem={editItem}
          onCancel={handleCancelEdit}
        />

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Riwayat Kegiatan
            </h2>

            {/* 3. KOTAK INPUT PENCARIAN */}
            <input
              type="text"
              placeholder="Cari kegiatan atau kategori..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:w-64"
            />
          </div>

          {/* PERHATIKAN: Data yang dikirim sekarang adalah logsYangDitampilkan, bukan logs aslinya */}
          <LogList
            logs={logsYangDitampilkan}
            editId={editItem?.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
