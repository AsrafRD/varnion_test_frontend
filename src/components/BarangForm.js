import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarangForm = ({ fetchBarangs }) => {
    const [nama, setNama] = useState('');
    const [userInput, setUserInput] = useState('');
    const [kodeKategori, setKodeKategori] = useState('');
    const [satuan, setSatuan] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [kategoriOptions, setKategoriOptions] = useState([]);
    const [satuanOptions, setSatuanOptions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/kategori-barangs')
            .then(response => setKategoriOptions(response.data))
            .catch(error => console.error('Error fetching kategori:', error));

        axios.get('http://127.0.0.1:8000/satuan-barangs')
            .then(response => setSatuanOptions(response.data))
            .catch(error => console.error('Error fetching satuan:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/barangs', {
            nama,
            user_input: userInput,
            kode_kategori: kodeKategori,
            satuan,
            jumlah: jumlah || null
        })
            .then(() => {
                fetchBarangs();
                setNama('');
                setUserInput('');
                setKodeKategori('');
                setSatuan('');
                setJumlah('');
            })
            .catch(error => console.error('Error creating barang:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                    maxLength={20}
                    minLength={2}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ID User Input</label>
                <input
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Kategori Barang</label>
                <select
                    value={kodeKategori}
                    onChange={(e) => setKodeKategori(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="">Pilih Kategori</option>
                    {kategoriOptions.map((kategori) => (
                        <option key={kategori.kode} value={kategori.kode}>
                            {kategori.nama}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Satuan Barang</label>
                <input
                    type="text"
                    value={satuan}
                    onChange={(e) => setSatuan(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Jumlah</label>
                <input
                    type="number"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    min={1}
                    max={100}
                />
            </div>
            <div>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                    Tambah Barang
                </button>
            </div>
        </form>
    );
};

export default BarangForm;
