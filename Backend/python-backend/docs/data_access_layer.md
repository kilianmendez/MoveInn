# Data Access Layer Documentation

## Overview

This backend uses a layered architecture for data access and business logic, separating concerns into **repositories** (for database CRUD) and **services** (for business logic). This approach improves maintainability, testability, and scalability.

---

## 1. Repository Pattern

### BaseRepository
- Provides generic CRUD operations for SQLAlchemy models: `get_all`, `get_by_id`, `create`, `update`, `delete`, `exists`.
- All entity-specific repositories inherit from `BaseRepository` and specify their model type.

**Example:**
```python
from repositories.base_repository import BaseRepository
from models.user import User

class UserRepository(BaseRepository[User]):
    pass  # Add custom queries if needed
```

### Usage
```python
repo = UserRepository()
user = repo.create(db_session, user_data)
user = repo.get_by_id(db_session, user_id)
users = repo.get_all(db_session)
user = repo.update(db_session, user, update_data)
repo.delete(db_session, user)
```

### Extending for New Models
- Create a new repository inheriting from `BaseRepository[YourModel]`.
- Add custom methods as needed.

---

## 2. Service Layer

### BaseService (Pattern)
- Encapsulates business logic and coordinates repository calls.
- Each entity has a service class (e.g., `UserService`, `AccommodationService`).
- Services are used by routers/controllers to implement API endpoints.

**Example:**
```python
from services.user_service import UserService
from repositories.user_repository import UserRepository

service = UserService(UserRepository())
user = service.create_user(db_session, user_data)
```

### Adding a New Service
- Create a new service class for your entity.
- Inject the corresponding repository.
- Implement business logic methods.

---

## 3. Dependency Injection
- Repositories are injected into services, which are then injected into routers/controllers (if using FastAPI).
- This enables easy testing and swapping of implementations.

---

## 4. Testing

### Unit Tests
- All repositories and services have unit tests in `python-backend/tests/`.
- Tests use fixtures for database sessions and sample data.
- To run all tests:
  ```sh
  pytest python-backend/tests/
  ```
- Tests cover CRUD operations and business logic for all main entities.

---

## 5. Best Practices
- Always use the repository for DB access; never access the session directly in services or controllers.
- Use services to encapsulate business logic; keep routers/controllers thin.
- Add docstrings to all public methods for maintainability.
- Use fixtures and in-memory SQLite for fast, isolated tests.

---

## 6. Example: Adding a New Entity
1. Define your SQLAlchemy model in `models/`.
2. Create a repository inheriting from `BaseRepository[YourModel]`.
3. Create a service class using your repository.
4. Add tests for both repository and service.
5. (Optional) Add API endpoints using the service.

---

## 7. References
- [SQLAlchemy ORM Documentation](https://docs.sqlalchemy.org/en/20/orm/)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

---
