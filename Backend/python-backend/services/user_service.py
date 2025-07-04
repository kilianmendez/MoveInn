from repositories.user_repository import UserRepository
from repositories.social_media_link_repository import SocialMediaLinkRepository
from repositories.user_language_repository import UserLanguageRepository
from typing import List, Optional

class UserService:
    def __init__(self, user_repository: UserRepository, social_media_link_repository: SocialMediaLinkRepository = None, user_language_repository: UserLanguageRepository = None):
        self.user_repository = user_repository
        self.social_media_link_repository = social_media_link_repository
        self.user_language_repository = user_language_repository

    def get_all_users(self, db):
        """C#: GetAllAsync"""
        return self.user_repository.get_all(db)

    def get_user_by_id(self, db, user_id):
        """C#: GetUserByIdAsync"""
        return self.user_repository.get_by_id(db, user_id)

    def get_user_by_mail(self, db, mail: str):
        """C#: GetUserByMailAsync"""
        return self.user_repository.get_by_mail(db, mail)

    def is_login_correct(self, db, mail: str, password: str) -> bool:
        """C#: IsLoginCorrect"""
        user = self.user_repository.get_by_mail(db, mail)
        if user and user.password == password:  # Replace with hashed check in production
            return True
        return False

    def insert(self, db, user_data: dict):
        """C#: InsertAsync"""
        return self.user_repository.create(db, user_data)

    def update_user(self, db, user_id, update_data: dict):
        """C#: UpdateUserAsync"""
        return self.user_repository.update(db, user_id, update_data)

    def update_user_social_media(self, db, user_id, links: List[dict]):
        """C#: UpdateUserSocialMediaAsync"""
        if not self.social_media_link_repository:
            raise NotImplementedError("SocialMediaLinkRepository required")
        self.social_media_link_repository.replace_social_medias(db, user_id, links)
        return self.get_user_by_id(db, user_id)

    def update_user_language(self, db, user_id, languages: List[dict]):
        """C#: UpdateUserLanguageAsync"""
        if not self.user_language_repository:
            raise NotImplementedError("UserLanguageRepository required")
        self.user_language_repository.replace_languages(db, user_id, languages)
        return self.get_user_by_id(db, user_id)

    def delete_user_by_id(self, db, user_id):
        """C#: DeleteAsyncUserById"""
        return self.user_repository.delete(db, user_id)

    def store_image(self, file, model_name: str):
        """C#: StoreImageAsync (placeholder, implement file storage logic)"""
        # Implement file storage logic here
        raise NotImplementedError("Image storage not implemented")

    def get_followers(self, db, user_id):
        """C#: GetFollowersAsync (placeholder)"""
        # Implement follower logic here
        raise NotImplementedError("Followers logic not implemented")

    def get_followings(self, db, user_id):
        """C#: GetFollowingsAsync (placeholder)"""
        # Implement followings logic here
        raise NotImplementedError("Followings logic not implemented")

    def get_all_countries(self, db):
        """C#: GetAllCountriesAsync (placeholder)"""
        # Implement country query logic here
        raise NotImplementedError("Country query not implemented")

    def get_cities_by_country(self, db, country: str):
        """C#: GetCitiesByCountryAsync (placeholder)"""
        # Implement city query logic here
        raise NotImplementedError("City query not implemented")

    # Add more user-specific business logic methods here 