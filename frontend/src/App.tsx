import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Servers from './pages/Servers';
import ServerDetail from './pages/ServerDetail';
import Peers from './pages/Peers';
import PeerDetail from './pages/PeerDetail';
import BindingEditor from './pages/BindingEditor';
import DeployQueue from './pages/DeployQueue';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/" className="font-bold">Dashboard</Link>
        <Link to="/servers">Servers</Link>
        <Link to="/peers">Peers</Link>
        <Link to="/deploy">Deploy</Link>
      </nav>
      <main className="p-4 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="servers" element={<Servers />} />
        <Route path="servers/:id" element={<ServerDetail />} />
        <Route path="peers" element={<Peers />} />
        <Route path="peers/:id" element={<PeerDetail />} />
        <Route path="bindings/:peerId/new" element={<BindingEditor />} />
        <Route path="deploy" element={<DeployQueue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
