import React from 'react';

const BarangTable = ({ barangs, currentPage, totalPages, fetchBarangs }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            fetchBarangs(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchBarangs(currentPage + 1);
        }
    };

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {barangs.map((barang, index) => (
                        <tr key={barang.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * 5 + index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{barang.kode}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{barang.kode_kategori}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{barang.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{barang.jumlah}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{barang.satuan}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                    Prev
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BarangTable;