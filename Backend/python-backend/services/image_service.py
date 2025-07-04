from repositories.image_repository import ImageRepository

class ImageService:
    def __init__(self, image_repository: ImageRepository):
        self.image_repository = image_repository

    def get_all_images(self, db):
        return self.image_repository.get_all(db)

    def get_image_by_id(self, db, image_id):
        return self.image_repository.get_by_id(db, image_id)

    # Add more image-specific business logic methods here 