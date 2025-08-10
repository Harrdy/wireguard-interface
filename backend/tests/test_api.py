import unittest

from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session

from backend.app.main import app
from backend.app.database import get_session


class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(cls.engine)

        def session_override():
            with Session(cls.engine) as session:
                yield session

        app.dependency_overrides[get_session] = session_override
        cls.client = TestClient(app)

    def test_create_server_and_peer(self):
        response = self.client.post(
            "/servers",
            json={
                "name": "srv1",
                "host": "1.1.1.1",
                "ssh_port": 22,
                "pools": [{"cidr": "10.0.0.0/24", "ip_version": 4}],
            },
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["name"], "srv1")
        self.assertEqual(len(data["pools"]), 1)

        response = self.client.get("/servers")
        self.assertEqual(response.status_code, 200)
        servers = response.json()
        self.assertEqual(len(servers), 1)

        response = self.client.post(
            "/peers",
            json={"name": "peer1", "public_key": "abc"},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "peer1")

        response = self.client.get("/peers")
        peers = response.json()
        self.assertEqual(len(peers), 1)


if __name__ == "__main__":
    unittest.main()
