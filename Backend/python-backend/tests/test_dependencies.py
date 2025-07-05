import pytest
from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from auth.dependencies import get_current_user, require_role
from models.user import User

app = FastAPI()

# Dummy user for testing
test_user = User(
    id="test-id",
    name="Test",
    last_name="User",
    mail="test@example.com",
    password="hashed",
    role="admin"
)

@app.get("/protected")
def protected_route(user: User = Depends(get_current_user)):
    return {"user_id": user.id}

@app.get("/admin")
def admin_route(user: User = Depends(require_role("admin"))):
    return {"user_id": user.id, "role": user.role}

client = TestClient(app)

@pytest.fixture(autouse=True)
def override_get_current_user_fixture(request):
    """
    Override get_current_user for tests that need it.
    Use marker 'no_override' to skip.
    """
    if "no_override" not in request.keywords:
        app.dependency_overrides[get_current_user] = lambda: test_user
        yield
        app.dependency_overrides.pop(get_current_user, None)
    else:
        yield

def test_protected_route_valid():
    response = client.get("/protected")
    assert response.status_code == 200
    assert response.json()["user_id"] == "test-id"

def test_admin_route_valid():
    response = client.get("/admin")
    assert response.status_code == 200
    assert response.json()["role"] == "admin"

@pytest.mark.no_override
def test_protected_route_invalid_token():
    # No override, so real dependency runs (should fail)
    token = "invalid.token.here"
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/protected", headers=headers)
    assert response.status_code == 401

@pytest.mark.no_override
def test_admin_route_insufficient_role():
    # Patch get_current_user to return a non-admin
    def non_admin_user():
        # Exclude _sa_instance_state
        user_dict = {k: v for k, v in test_user.__dict__.items() if k != "_sa_instance_state"}
        user_dict["role"] = "user"
        return User(**user_dict)
    app.dependency_overrides[get_current_user] = non_admin_user
    response = client.get("/admin")
    assert response.status_code == 403
    app.dependency_overrides.pop(get_current_user, None) 