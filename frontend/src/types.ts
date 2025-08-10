export interface AddressPool {
  id: string;
  cidr: string;
  version: 'IPv4' | 'IPv6';
}

export interface Server {
  id: string;
  name: string;
  host: string;
  sshPort: number;
  sshUser: string;
  authType: 'key' | 'agent';
  osType: string;
  tags: string[];
  pools: AddressPool[];
  instances: Instance[];
}

export interface Instance {
  id: string;
  serverId: string;
  name: string;
  listenPort: number;
  dns?: string;
  mtu?: number;
}

export interface Peer {
  id: string;
  name: string;
  description?: string;
  publicKey: string;
  privateKey?: string;
  psk?: string;
}

export interface PeerBinding {
  id: string;
  peerId: string;
  serverId: string;
  instanceId: string;
  ip4?: string;
  ip6?: string;
  allowedIps?: string;
  keepalive?: number;
  endpoint?: string;
  dns?: string;
}
