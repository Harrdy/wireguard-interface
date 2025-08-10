import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppState } from '../state';

interface FormData {
  name: string;
  host: string;
  sshPort: number;
  sshUser: string;
  authType: 'key' | 'agent';
  osType: string;
  tags: string;
}

export default function Servers() {
  const { servers, addServer } = useAppState();
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { sshPort: 22, authType: 'key' }
  });

  const onSubmit = handleSubmit((data) => {
    addServer({
      name: data.name,
      host: data.host,
      sshPort: Number(data.sshPort),
      sshUser: data.sshUser,
      authType: data.authType,
      osType: data.osType,
      tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    reset();
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Servers</h1>
      <ul className="list-disc pl-6">
        {servers.map(s => (
          <li key={s.id}>
            <Link className="text-blue-600 underline" to={`/servers/${s.id}`}>{s.name} ({s.host})</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="space-y-2 border p-4 rounded">
        <h2 className="font-semibold">Add Server</h2>
        <input {...register('name', { required: true })} placeholder="Name" className="border p-1 w-full" />
        <input {...register('host', { required: true })} placeholder="FQDN/IP" className="border p-1 w-full" />
        <input type="number" {...register('sshPort', { valueAsNumber: true })} placeholder="SSH Port" className="border p-1 w-full" />
        <input {...register('sshUser')} placeholder="SSH User" className="border p-1 w-full" />
        <select {...register('authType')} className="border p-1 w-full">
          <option value="key">Key</option>
          <option value="agent">Agent</option>
        </select>
        <input {...register('osType')} placeholder="OS Type" className="border p-1 w-full" />
        <input {...register('tags')} placeholder="Tags (comma separated)" className="border p-1 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
      </form>
    </div>
  );
}
