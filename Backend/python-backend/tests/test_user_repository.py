import pytest
from repositories.user_repository import UserRepository
from models.user import User

@pytest.fixture
def user_repository():
    return UserRepository()

def test_create_user(db_session, user_repository, sample_user):
    user = user_repository.create(db_session, sample_user)
    assert user.id is not None
    assert user.mail == sample_user["mail"]

def test_get_user_by_id(db_session, user_repository, sample_user):
    user = user_repository.create(db_session, sample_user)
    fetched = user_repository.get_by_id(db_session, user.id)
    assert fetched is not None
    assert fetched.mail == sample_user["mail"]

def test_get_user_by_mail(db_session, user_repository, sample_user):
    user_repository.create(db_session, sample_user)
    fetched = user_repository.get_by_mail(db_session, sample_user["mail"])
    assert fetched is not None
    assert fetched.mail == sample_user["mail"]

def test_update_user(db_session, user_repository, sample_user):
    user = user_repository.create(db_session, sample_user)
    update_data = {"name": "Updated"}
    updated = user_repository.update(db_session, user, update_data)
    assert updated.name == "Updated"

def test_delete_user(db_session, user_repository, sample_user):
    user = user_repository.create(db_session, sample_user)
    user_repository.delete(db_session, user)
    assert user_repository.get_by_id(db_session, user.id) is None 