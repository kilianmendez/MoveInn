import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.host_service import HostService
from repositories.host_repository import HostRepository
from models.user import User
from models.host import Host

@pytest.fixture
def host_service():
    return HostService(HostRepository())

@pytest.fixture
def host_data(sample_user, db_session):
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return {
        "user_id": user.id,
        "reason": "Test Reason",
        "created_at": None,
        "status": "Pending",
        "host_since": None,
        "updated_at": None
    }

def test_get_all_hosts(db_session, host_service, host_data):
    host = Host(**host_data)
    db_session.add(host)
    db_session.commit()
    hosts = host_service.get_all_hosts(db_session)
    assert len(hosts) >= 1

def test_get_host_by_id(db_session, host_service, host_data):
    host = Host(**host_data)
    db_session.add(host)
    db_session.commit()
    found = host_service.get_host_by_id(db_session, host.id)
    assert found is not None
    assert found.reason == host_data["reason"] 