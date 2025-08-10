import { createContext, useContext, useState, ReactNode } from 'react';
import { Server, Peer, PeerBinding, Instance, AddressPool } from './types';

interface AppState {
  servers: Server[];
  peers: Peer[];
  bindings: PeerBinding[];
  addServer: (data: Omit<Server, 'id' | 'instances' | 'pools'> & {pools?: AddressPool[]}) => Server;
  addPool: (serverId: string, pool: Omit<AddressPool, 'id'>) => void;
  addInstance: (serverId: string, data: Omit<Instance, 'id' | 'serverId'>) => Instance;
  addPeer: (data: Omit<Peer, 'id'>) => Peer;
  addBinding: (data: Omit<PeerBinding, 'id'>) => PeerBinding;
}

const AppContext = createContext<AppState | undefined>(undefined);

function uid() {
  return Math.random().toString(36).slice(2);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [servers, setServers] = useState<Server[]>([]);
  const [peers, setPeers] = useState<Peer[]>([]);
  const [bindings, setBindings] = useState<PeerBinding[]>([]);

  const addServer: AppState['addServer'] = (data) => {
    const server: Server = {
      id: uid(),
      instances: [],
      pools: data.pools || [],
      ...data,
    };
    setServers((s) => [...s, server]);
    return server;
  };

  const addPool: AppState['addPool'] = (serverId, pool) => {
    setServers((list) =>
      list.map((s) =>
        s.id === serverId
          ? { ...s, pools: [...s.pools, { ...pool, id: uid() }] }
          : s
      )
    );
  };

  const addInstance: AppState['addInstance'] = (serverId, data) => {
    const instance: Instance = { id: uid(), serverId, ...data };
    setServers((list) =>
      list.map((s) =>
        s.id === serverId
          ? { ...s, instances: [...s.instances, instance] }
          : s
      )
    );
    return instance;
  };

  const addPeer: AppState['addPeer'] = (data) => {
    const peer: Peer = { id: uid(), ...data };
    setPeers((p) => [...p, peer]);
    return peer;
  };

  const addBinding: AppState['addBinding'] = (data) => {
    const binding: PeerBinding = { id: uid(), ...data };
    setBindings((b) => [...b, binding]);
    return binding;
  };

  return (
    <AppContext.Provider
      value={{ servers, peers, bindings, addServer, addPool, addInstance, addPeer, addBinding }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppProvider missing');
  return ctx;
}
