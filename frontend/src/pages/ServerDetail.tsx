import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppState } from '../state';

export default function ServerDetail() {
  const { id } = useParams();
  const { servers, addPool, addInstance } = useAppState();
  const server = servers.find(s => s.id === id);
  const poolForm = useForm<{ cidr: string; version: 'IPv4' | 'IPv6' }>();
  const instForm = useForm<{ name: string; listenPort: number; dns?: string; mtu?: number }>();

  if (!server) return <div>Server not found</div>;

  const onPool = poolForm.handleSubmit(data => {
    addPool(server.id, data);
    poolForm.reset();
  });

  const onInstance = instForm.handleSubmit(data => {
    addInstance(server.id, {
      name: data.name,
      listenPort: Number(data.listenPort),
      dns: data.dns,
      mtu: data.mtu ? Number(data.mtu) : undefined,
    });
    instForm.reset();
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{server.name}</h1>
      <div>
        <h2 className="font-semibold">Address Pools</h2>
        <ul className="list-disc pl-6">
          {server.pools.map(p => (
            <li key={p.id}>{p.version}: {p.cidr}</li>
          ))}
        </ul>
        <form onSubmit={onPool} className="space-y-2 mt-2">
          <input {...poolForm.register('cidr', { required: true })} placeholder="CIDR" className="border p-1 w-full" />
          <select {...poolForm.register('version')} className="border p-1 w-full">
            <option value="IPv4">IPv4</option>
            <option value="IPv6">IPv6</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Add Pool</button>
        </form>
      </div>
      <div>
        <h2 className="font-semibold">Instances</h2>
        <ul className="list-disc pl-6">
          {server.instances.map(i => (
            <li key={i.id}>{i.name} (Port {i.listenPort})</li>
          ))}
        </ul>
        <form onSubmit={onInstance} className="space-y-2 mt-2">
          <input {...instForm.register('name', { required: true })} placeholder="Interface Name" className="border p-1 w-full" />
          <input type="number" {...instForm.register('listenPort', { valueAsNumber: true })} placeholder="Listen Port" className="border p-1 w-full" />
          <input {...instForm.register('dns')} placeholder="DNS" className="border p-1 w-full" />
          <input type="number" {...instForm.register('mtu', { valueAsNumber: true })} placeholder="MTU" className="border p-1 w-full" />
          <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Add Instance</button>
        </form>
      </div>
    </div>
  );
}
