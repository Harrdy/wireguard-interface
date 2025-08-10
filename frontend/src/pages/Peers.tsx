import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppState } from '../state';

interface FormData {
  name: string;
  description?: string;
  publicKey: string;
}

export default function Peers() {
  const { peers, addPeer } = useAppState();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    addPeer({
      name: data.name,
      description: data.description,
      publicKey: data.publicKey,
    });
    reset();
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Peers</h1>
      <ul className="list-disc pl-6">
        {peers.map(p => (
          <li key={p.id}>
            <Link className="text-blue-600 underline" to={`/peers/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="space-y-2 border p-4 rounded">
        <h2 className="font-semibold">Add Peer</h2>
        <input {...register('name', { required: true })} placeholder="Name" className="border p-1 w-full" />
        <input {...register('description')} placeholder="Description" className="border p-1 w-full" />
        <input {...register('publicKey', { required: true })} placeholder="Public Key" className="border p-1 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
      </form>
    </div>
  );
}
