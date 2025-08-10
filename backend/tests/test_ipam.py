import unittest

from backend.app.ipam import next_available_ip


class TestIPAM(unittest.TestCase):
    def test_allocate_ipv4(self):
        cidr = "10.0.0.0/30"
        used = ["10.0.0.1"]
        self.assertEqual(next_available_ip(cidr, used), "10.0.0.2")

    def test_allocate_ipv6(self):
        cidr = "fd00::/126"
        used = ["fd00::1", "fd00::2"]
        self.assertEqual(next_available_ip(cidr, used), "fd00::3")

    def test_pool_exhausted(self):
        cidr = "192.0.2.0/30"
        used = ["192.0.2.1", "192.0.2.2"]
        self.assertIsNone(next_available_ip(cidr, used))


if __name__ == "__main__":
    unittest.main()
