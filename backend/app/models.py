from __future__ import annotations

from typing import List, Optional

from sqlmodel import SQLModel, Field, Relationship


class AddressPoolBase(SQLModel):
    cidr: str
    ip_version: int


class AddressPool(AddressPoolBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    server_id: int = Field(foreign_key="server.id")
    server: Optional['Server'] = Relationship(back_populates="pools")


class AddressPoolRead(AddressPoolBase):
    id: int


class ServerBase(SQLModel):
    name: str
    host: str
    ssh_port: int = 22


class Server(ServerBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    pools: List[AddressPool] = Relationship(back_populates="server")
    instances: List['Instance'] = Relationship(back_populates="server")


class ServerCreate(ServerBase):
    pools: List[AddressPoolBase] = []


class ServerRead(ServerBase):
    id: int
    pools: List[AddressPoolRead] = []


class InstanceBase(SQLModel):
    name: str
    listen_port: int


class Instance(InstanceBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    server_id: int = Field(foreign_key="server.id")
    server: Optional[Server] = Relationship(back_populates="instances")
    bindings: List['PeerBinding'] = Relationship(back_populates="instance")


class InstanceCreate(InstanceBase):
    server_id: int


class InstanceRead(InstanceBase):
    id: int
    server_id: int


class PeerBase(SQLModel):
    name: str
    public_key: str
    private_key: Optional[str] = None
    psk: Optional[str] = None


class Peer(PeerBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bindings: List['PeerBinding'] = Relationship(back_populates="peer")


class PeerCreate(PeerBase):
    pass


class PeerRead(PeerBase):
    id: int


class PeerBindingBase(SQLModel):
    ip4: Optional[str] = None
    ip6: Optional[str] = None
    allowed_ips: Optional[str] = None
    persistent_keepalive: Optional[int] = None


class PeerBinding(PeerBindingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    peer_id: int = Field(foreign_key="peer.id")
    instance_id: int = Field(foreign_key="instance.id")
    peer: Optional[Peer] = Relationship(back_populates="bindings")
    instance: Optional[Instance] = Relationship(back_populates="bindings")


class PeerBindingCreate(PeerBindingBase):
    peer_id: int
    instance_id: int


class PeerBindingRead(PeerBindingBase):
    id: int
    peer_id: int
    instance_id: int
