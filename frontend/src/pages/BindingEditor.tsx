import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppState } from '../state';

interface FormData {
  serverId: string;
  instanceId: string;
  ip4?: string;
  ip6?: string;
  allowedIps?: string;
  keepalive?: number;
  endpoint?: string;
  dns?: string;
}

export default function BindingEditor() {
  const { peerId } = useParams();
  const navigate = useNavigate();
  const { servers, addBinding } = useAppState();
  const { register, handleSubmit, watch } = useForm<FormData>();
  const selectedServer = servers.find(s => s.id === watch('serverId'));

  const onSubmit = handleSubmit(data => {
    if (!peerId) return;
    addBinding({
      peerId,
      serverId: data.serverId,
      instanceId: data.instanceId,
      ip4: data.ip4,
      ip6: data.ip6,
      allowedIps: data.allowedIps,
      keepalive: data.keepalive ? Number(data.keepalive) : undefined,
      endpoint: data.endpoint,
      dns: data.dns,
    });
    navigate(`/peers/${peerId}`);
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Add Binding</h1>
      <form onSubmit={onSubmit} className="space-y-2">
        <select {...register('serverId', { required: true })} className="border p-1 w-full">
          <option value="">Select Server</option>
          {servers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select {...register('instanceId', { required: true })} className="border p-1 w-full">
          <option value="">Select Instance</option>
          {selectedServer?.instances.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
        <input {...register('ip4')} placeholder="IPv4" className="border p-1 w-full" />
        <input {...register('ip6')} placeholder="IPv6" className="border p-1 w-full" />
        <input {...register('allowedIps')} placeholder="AllowedIPs" className="border p-1 w-full" />
        <input type="number" {...register('keepalive', { valueAsNumber: true })} placeholder="Keepalive" className="border p-1 w-full" />
        <input {...register('endpoint')} placeholder="Endpoint" className="border p-1 w-full" />
        <input {...register('dns')} placeholder="DNS" className="border p-1 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
      </form>
    </div>
  );
}
