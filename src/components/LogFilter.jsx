// src/components/LogFilter.jsx
export default function LogFilter({
  kataKunci,
  setKataKunci,
  filterKategori,
  setFilterKategori,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Dropdown Filter Kategori */}
      <select
        value={filterKategori}
        onChange={(e) => setFilterKategori(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-white"
      >
        <option value="Semua">Semua Kategori</option>
        <option value="Belajar">Belajar</option>
        <option value="Pekerjaan">Pekerjaan</option>
        <option value="Proyek Pribadi">Proyek Pribadi</option>
        <option value="Lainnya">Lainnya</option>
      </select>

      {/* Kotak Input Pencarian */}
      <input
        type="text"
        placeholder="Cari kegiatan..."
        value={kataKunci}
        onChange={(e) => setKataKunci(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:w-64"
      />
    </div>
  );
}
