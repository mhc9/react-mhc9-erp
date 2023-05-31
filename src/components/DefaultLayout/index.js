import React from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <div className="w-full bg-gray-200">
            <header className="">
                <Navbar />
            </header>

            <main className="mx-20 bg-white min-h-[87vh]">
                <section className="p-4">
                    <Outlet />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default DefaultLayout