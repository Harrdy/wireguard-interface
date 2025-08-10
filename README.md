# WireGuard Interface (Skeleton)

This repository contains a minimal skeleton for a WireGuard management tool.
Currently it only provides basic backend structures and a placeholder front-end
setup. Packaging, deployment and API endpoints are intentionally omitted.

## Backend

* Python 3.11 standard library only (no external dependencies).
* Dataclass models describing servers, instances, peers and bindings.
* Simple IP address allocation helper located in `backend/app/ipam.py`.
* Unit tests implemented with the built-in `unittest` framework.

Run the tests via:

```bash
python -m unittest
```

## Frontend

A minimal directory structure for a React + TypeScript + Tailwind project is
included under `frontend/`. Dependencies are listed in `package.json` but not
installed in this environment.

## Notes

This codebase is an early scaffold meant to be extended with real FastAPI
endpoints, database integration, and a fully fledged React UI when dependencies
are available.
