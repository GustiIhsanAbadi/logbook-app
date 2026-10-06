// src/components/LogForm.jsx
import { useState, useEffect } from "react";

export default function LogForm({ onSave, editItem, onCancel }) {
  // State lokal khusus untuk form
  const [kegiatan, setKegiatan] = useState("");
  const [kategori, setKategori] = useState("Belajar");
  const [catatan, setCatatan] = useState("");

  // Efek ini akan menarik data lama jika tombol Edit ditekan
  useEffect(() => {
    if (editItem) {
      setKegiatan(editItem.kegiatan);
      setKategori(editItem.kategori);
      setCatatan(editItem.catatan);
    } else {
      // Kosongkan form jika batal/selesai edit
      setKegiatan("");
      setKategori("Belajar");
      setCatatan("");
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kegiatan) return;

    // Kirim data yang diketik ke "Manajer" (App.jsx)
    onSave({ kegiatan, kategori, catatan });

    // Kosongkan form setelah simpan
    setKegiatan("");
    setKategori("Belajar");
    setCatatan("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-t-4 border-blue-600">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editItem ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama Kegiatan
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Mengerjakan modul kelas..."
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
            placeholder="Apa yang berhasil diselesaikan hari ini?"
            rows="3"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`${
            editItem
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-2`}
        >
          {editItem ? "Simpan Perubahan" : "Simpan Kegiatan"}
        </button>

        {editItem && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Batal Edit
          </button>
        )}
      </form>
    </div>
  );
}
