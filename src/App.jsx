import { useState, useEffect } from "react";

export default function App() {
  // 1. STATE DENGAN LOCAL STORAGE
  const [logs, setLogs] = useState(() => {
    const dataTersimpan = localStorage.getItem("data_logbook");
    return dataTersimpan ? JSON.parse(dataTersimpan) : [];
  });

  const [kegiatan, setKegiatan] = useState("");
  const [kategori, setKategori] = useState("Belajar");
  const [catatan, setCatatan] = useState("");

  // 2. EFEK SAMPING (MENYIMPAN OTOMATIS)
  useEffect(() => {
    localStorage.setItem("data_logbook", JSON.stringify(logs));
  }, [logs]);

  // 3. FUNGSI UNTUK MENYIMPAN DATA
  const tambahLog = (e) => {
    e.preventDefault();
    if (!kegiatan) return;

    const logBaru = {
      id: Date.now(),
      tanggal: new Date().toLocaleDateString("id-ID"),
      kegiatan: kegiatan,
      kategori: kategori,
      catatan: catatan,
    };

    setLogs([logBaru, ...logs]);
    setKegiatan("");
    setCatatan("");
  };

  // 4. FUNGSI UNTUK MENGHAPUS DATA (BARU)
  const hapusLog = (idYangDihapus) => {
    // Menyaring log: hanya pertahankan data yang ID-nya TIDAK SAMA dengan yang diklik
    const sisaLogs = logs.filter((log) => log.id !== idYangDihapus);
    setLogs(sisaLogs);
  };

  // 5. TAMPILAN ANTARMUKA (UI)
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Log Book App</h1>
        <p className="text-gray-600 mb-8">Aplikasi pencatat kegiatan harian.</p>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-t-4 border-blue-600">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Tambah Kegiatan Baru
          </h2>

          <form onSubmit={tambahLog} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Kegiatan
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Mengerjakan modul kelas di Kopi 1815"
                value={kegiatan}
                onChange={(e) => setKegiatan(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Kategori
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="Belajar">Belajar</option>
                <option value="Pekerjaan">Pekerjaan</option>
                <option value="Proyek Pribadi">Proyek Pribadi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Catatan / Hasil
              </label>
              <textarea
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apa yang berhasil diselesaikan atau kendala apa yang dialami hari ini?"
                rows="3"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mt-2"
            >
              Simpan Kegiatan
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Riwayat Kegiatan
          </h2>

          {logs.length === 0 ? (
            <p className="text-gray-500 italic text-center py-4">
              Belum ada kegiatan yang dicatat. Mari mulai produktif hari ini!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {log.kegiatan}
                      </h3>
                      <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full mt-2 inline-block">
                        {log.kategori}
                      </span>
                      {log.catatan && (
                        <p className="text-gray-600 mt-2 text-sm whitespace-pre-wrap">
                          {log.catatan}
                        </p>
                      )}
                    </div>

                    {/* Bagian Kanan Kartu: Tanggal & Tombol Hapus */}
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className="text-sm text-gray-500 font-medium bg-white px-2 py-1 rounded shadow-sm">
                        {log.tanggal}
                      </span>
                      <button
                        onClick={() => hapusLog(log.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold bg-red-50 px-3 py-1 rounded-md transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
