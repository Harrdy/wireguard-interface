from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class AddressPool:
    """Represents an IPv4 or IPv6 CIDR range associated with a server."""

    cidr: str
    ip_version: int


@dataclass
class Server:
    """A remote host capable of running WireGuard."""

    name: str
    host: str
    ssh_port: int = 22
    pools: List[AddressPool] = field(default_factory=list)
    instances: List[Instance] = field(default_factory=list)  # defined later


@dataclass
class Instance:
    """A WireGuard interface on a server."""

    name: str
    listen_port: int
    server: Server


@dataclass
class Peer:
    """A global peer identity with a single key pair."""

    name: str
    public_key: str
    private_key: Optional[str] = None
    psk: Optional[str] = None
    bindings: List[PeerBinding] = field(default_factory=list)  # defined later


@dataclass
class PeerBinding:
    """Associates a peer with a specific server instance and IP addresses."""

    peer: Peer
    instance: Instance
    ip4: Optional[str] = None
    ip6: Optional[str] = None
    allowed_ips: Optional[List[str]] = None
    persistent_keepalive: Optional[int] = None
