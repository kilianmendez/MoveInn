from repositories.speciality_repository import SpecialityRepository

class SpecialityService:
    def __init__(self, speciality_repository: SpecialityRepository):
        self.speciality_repository = speciality_repository

    def get_all_specialities(self, db):
        return self.speciality_repository.get_all(db)

    def get_speciality_by_id(self, db, speciality_id):
        return self.speciality_repository.get_by_id(db, speciality_id)

    # Add more speciality-specific business logic methods here 