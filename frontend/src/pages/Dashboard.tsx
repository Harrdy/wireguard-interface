import { useAppState } from '../state';

export default function Dashboard() {
  const { servers, peers, bindings } = useAppState();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded">Servers: {servers.length}</div>
        <div className="p-4 bg-gray-100 rounded">Peers: {peers.length}</div>
        <div className="p-4 bg-gray-100 rounded">Bindings: {bindings.length}</div>
      </div>
    </div>
  );
}
