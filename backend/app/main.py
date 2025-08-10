from typing import List

from fastapi import FastAPI, Depends
from sqlmodel import Session, select

from .database import init_db, get_session
from .models import (
    Server, ServerCreate, ServerRead,
    AddressPool, AddressPoolBase,
    Peer, PeerCreate, PeerRead,
)

app = FastAPI()


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.post("/servers", response_model=ServerRead)
def create_server(server: ServerCreate, session: Session = Depends(get_session)) -> Server:
    db_server = Server(name=server.name, host=server.host, ssh_port=server.ssh_port)
    session.add(db_server)
    session.commit()
    session.refresh(db_server)
    for pool in server.pools:
        session.add(AddressPool(cidr=pool.cidr, ip_version=pool.ip_version, server_id=db_server.id))
    session.commit()
    session.refresh(db_server)
    return db_server


@app.get("/servers", response_model=List[ServerRead])
def list_servers(session: Session = Depends(get_session)) -> List[Server]:
    servers = session.exec(select(Server)).all()
    for srv in servers:
        srv.pools  # load relationships
    return servers


@app.post("/peers", response_model=PeerRead)
def create_peer(peer: PeerCreate, session: Session = Depends(get_session)) -> Peer:
    db_peer = Peer(**peer.dict())
    session.add(db_peer)
    session.commit()
    session.refresh(db_peer)
    return db_peer


@app.get("/peers", response_model=List[PeerRead])
def list_peers(session: Session = Depends(get_session)) -> List[Peer]:
    return session.exec(select(Peer)).all()


__all__ = ["app"]
