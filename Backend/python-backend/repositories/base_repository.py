from sqlalchemy.orm import Session
from typing import Generic, TypeVar, Type, List, Optional
from sqlalchemy.exc import NoResultFound

T = TypeVar('T')

class BaseRepository(Generic[T]):
    def __init__(self, model: Type[T]):
        self.model = model

    def get_all(self, db: Session) -> List[T]:
        return db.query(self.model).all()

    def get_by_id(self, db: Session, id) -> Optional[T]:
        return db.query(self.model).get(id)

    def create(self, db: Session, obj_in: dict) -> T:
        obj = self.model(**obj_in)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def update(self, db: Session, db_obj: T, obj_in: dict) -> T:
        for field, value in obj_in.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, db_obj: T) -> None:
        db.delete(db_obj)
        db.commit()

    def exists(self, db: Session, **kwargs) -> bool:
        return db.query(self.model).filter_by(**kwargs).first() is not None 