from repositories.user_language_repository import UserLanguageRepository

class UserLanguageService:
    def __init__(self, user_language_repository: UserLanguageRepository):
        self.user_language_repository = user_language_repository

    def get_all_user_languages(self, db):
        return self.user_language_repository.get_all(db)

    def get_user_language_by_id(self, db, user_language_id):
        return self.user_language_repository.get_by_id(db, user_language_id)

    # Add more user-language-specific business logic methods here 