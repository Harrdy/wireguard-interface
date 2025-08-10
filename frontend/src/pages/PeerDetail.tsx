import { Link, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAppState } from '../state';

export default function PeerDetail() {
  const { id } = useParams();
  const { peers, bindings, servers } = useAppState();
  const peer = peers.find(p => p.id === id);
  if (!peer) return <div>Peer not found</div>;
  const peerBindings = bindings.filter(b => b.peerId === peer.id);

  const resolve = (b: typeof peerBindings[number]) => {
    const server = servers.find(s => s.id === b.serverId);
    const instance = server?.instances.find(i => i.id === b.instanceId);
    return `${server?.name}/${instance?.name}`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{peer.name}</h1>
      <p>{peer.description}</p>
      <p className="font-mono break-all">{peer.publicKey}</p>
      <div>
        <h2 className="font-semibold">Bindings</h2>
        <ul className="list-disc pl-6">
          {peerBindings.map(b => (
            <li key={b.id} className="mb-2">
              {resolve(b)} - {b.ip4 || ''} {b.ip6 || ''}
              <div className="mt-1">
                <QRCodeSVG value={`${peer.name}-${b.id}`} size={64} />
              </div>
            </li>
          ))}
        </ul>
        <Link to={`/bindings/${peer.id}/new`} className="text-blue-600 underline">Add Binding</Link>
      </div>
    </div>
  );
}
