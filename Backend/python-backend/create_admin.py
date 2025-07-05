from sqlalchemy.orm import Session
from models.user import User
from repositories.user_repository import UserRepository
from auth.password_utils import hash_password
from database import SessionLocal

ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "admin123"

admin_data = {
    "name": "Admin",
    "last_name": "User",
    "mail": ADMIN_EMAIL,
    "password": hash_password(ADMIN_PASSWORD),
    "role": "admin",
    "biography": "Superuser account",
    "avatar_url": None,
    "school": None,
    "degree": None,
    "nationality": None,
    "city": None,
    "erasmus_country": None,
    "erasmus_date": None,
    "phone": "0000000000"
}

def main():
    db = SessionLocal()
    repo = UserRepository()
    existing = repo.get_by_mail(db, ADMIN_EMAIL)
    if existing:
        print(f"Admin user already exists: {existing.mail}")
    else:
        user = repo.create(db, admin_data)
        db.commit()
        print(f"Admin user created: {user.mail} (password: {ADMIN_PASSWORD})")
    db.close()

if __name__ == "__main__":
    main() 