import pytest
from services.user_service import UserService
from repositories.user_repository import UserRepository
from unittest.mock import MagicMock

@pytest.fixture
def mock_user_repository():
    repo = MagicMock(spec=UserRepository)
    return repo

@pytest.fixture
def user_service(mock_user_repository):
    return UserService(user_repository=mock_user_repository)

def test_get_all_users(user_service, mock_user_repository):
    mock_user_repository.get_all.return_value = ["user1", "user2"]
    result = user_service.get_all_users(db=None)
    assert result == ["user1", "user2"]
    mock_user_repository.get_all.assert_called_once()

def test_get_user_by_id(user_service, mock_user_repository):
    mock_user_repository.get_by_id.return_value = {"id": 1, "mail": "test@example.com"}
    result = user_service.get_user_by_id(db=None, user_id=1)
    assert result["id"] == 1
    mock_user_repository.get_by_id.assert_called_once_with(None, 1)

def test_insert_user(user_service, mock_user_repository, sample_user):
    mock_user_repository.create.return_value = {"id": 1, **sample_user}
    result = user_service.insert(db=None, user_data=sample_user)
    assert result["mail"] == sample_user["mail"]
    mock_user_repository.create.assert_called_once_with(None, sample_user) 