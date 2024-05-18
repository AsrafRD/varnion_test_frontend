import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import './index.css';
import BarangTable from './components/BarangTable';
import BarangForm from './components/BarangForm';


const App = () => {
    const [user, setUser] = useState(null);
    const [barangs, setBarangs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/random-user')
            .then(response => {
                console.log('Response data:', response.data); // Periksa respons data
                setUser(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchBarangs = (page = 1) => {
        axios.get(`http://127.0.0.1:8000/barangs?page=${page}`)
            .then(response => {
                setBarangs(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchBarangs();
    }, []);

    return (
        <div>
            <div>
                <h1>Data Pengguna</h1>
                <UserTable user={user} />
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>
                <BarangTable
                    barangs={barangs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    fetchBarangs={fetchBarangs}
                />
                <h1 className="text-2xl font-bold mt-8 mb-4">Tambah Barang</h1>
                <BarangForm fetchBarangs={fetchBarangs} />
            </div>
        </div>
    );
};

export default App;
