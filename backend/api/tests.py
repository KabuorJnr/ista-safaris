from django.test import TestCase


class HealthTests(TestCase):
    def test_health_returns_ok(self):
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_openapi_schema_is_published(self):
        response = self.client.get("/api/v1/schema/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"/api/v1/health", response.content)

    def test_admin_login_page_loads(self):
        response = self.client.get("/admin/login/")
        self.assertEqual(response.status_code, 200)
