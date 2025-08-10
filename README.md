# WireGuard Interface (Skeleton)

This repository contains a minimal skeleton for a WireGuard management tool.
It now includes a small FastAPI backend using SQLModel along with a placeholder
React front-end.

## Backend

* FastAPI application with SQLModel persistence (SQLite by default).
* Models for servers, address pools, peers, instances and bindings.
* Simple IP address allocation helper located in `backend/app/ipam.py`.
* REST endpoints:
  * `POST /servers` and `GET /servers`
  * `POST /peers` and `GET /peers`
* Unit tests implemented with the built-in `unittest` framework.

Run the tests via:

```bash
python -m unittest discover backend/tests
```

## Frontend

A minimal directory structure for a React + TypeScript + Tailwind project is
included under `frontend/`. Dependencies are listed in `package.json` but not
installed in this environment.

## Notes

This codebase remains an early scaffold meant to be extended with additional
API endpoints, database migrations, and a fully fledged React UI when
dependencies are available.
