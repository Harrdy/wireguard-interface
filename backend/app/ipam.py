"""Simple IP Address Management helpers."""

from ipaddress import ip_network
from typing import Iterable, Optional


def next_available_ip(cidr: str, used: Iterable[str]) -> Optional[str]:
    """Return the next available IP address in *cidr* not present in *used*.

    :param cidr: CIDR notation string (e.g. "10.0.0.0/24")
    :param used: Iterable of already allocated IP addresses as strings
    :return: The next free IP address as string or ``None`` if pool exhausted
    """

    network = ip_network(cidr)
    used_set = set(used)
    for ip in network.hosts():
        if str(ip) not in used_set:
            return str(ip)
    return None
