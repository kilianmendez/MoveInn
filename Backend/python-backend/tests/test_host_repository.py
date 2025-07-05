import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy.orm import Session
from models.host import Host
from repositories.host_repository import HostRepository
from models.user import User

@pytest.fixture
def sample_host(sample_user, db_session):
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    host_data = {
        "user_id": user.id,
        "reason": "Test Reason",
        "created_at": None,
        "status": "Pending",
        "host_since": None,
        "updated_at": None
    }
    return host_data, user

def test_create_host(db_session, sample_host):
    repo = HostRepository()
    host_data, _ = sample_host
    host = repo.create(db_session, host_data)
    result = repo.get_all(db_session)
    assert len(result) == 1
    assert result[0].reason == host_data["reason"]

def test_get_host_by_id(db_session, sample_host):
    repo = HostRepository()
    host_data, _ = sample_host
    host = repo.create(db_session, host_data)
    found = repo.get_by_id(db_session, host.id)
    assert found is not None
    assert found.reason == host_data["reason"]

def test_update_host(db_session, sample_host):
    repo = HostRepository()
    host_data, _ = sample_host
    host = repo.create(db_session, host_data)
    update_data = {"reason": "Updated Reason"}
    updated = repo.update(db_session, host, update_data)
    assert updated.reason == "Updated Reason"

def test_delete_host(db_session, sample_host):
    repo = HostRepository()
    host_data, _ = sample_host
    host = repo.create(db_session, host_data)
    repo.delete(db_session, host)
    found = repo.get_by_id(db_session, host.id)
    assert found is None 