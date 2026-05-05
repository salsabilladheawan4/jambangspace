import './assets/tailwind.css';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Employees from './pages/Employees';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/employees" element={<Employees />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;