from repositories.forum_thread_repository import ForumThreadRepository

class ForumThreadService:
    def __init__(self, forum_thread_repository: ForumThreadRepository):
        self.forum_thread_repository = forum_thread_repository

    def get_all_threads(self, db):
        return self.forum_thread_repository.get_all(db)

    def get_thread_by_id(self, db, thread_id):
        return self.forum_thread_repository.get_by_id(db, thread_id)

    # Add more thread-specific business logic methods here 