import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="w-full">
      <header className="">
        <Navbar />
      </header>

      <main className="h-[100vh]">
        <section>
          Welcome to IT Helpdesk System
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
