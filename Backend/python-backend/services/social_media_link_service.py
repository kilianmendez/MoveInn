from repositories.social_media_link_repository import SocialMediaLinkRepository

class SocialMediaLinkService:
    def __init__(self, social_media_link_repository: SocialMediaLinkRepository):
        self.social_media_link_repository = social_media_link_repository

    def get_all_social_media_links(self, db):
        return self.social_media_link_repository.get_all(db)

    def get_social_media_link_by_id(self, db, social_media_link_id):
        return self.social_media_link_repository.get_by_id(db, social_media_link_id)

    # Add more social-media-link-specific business logic methods here 