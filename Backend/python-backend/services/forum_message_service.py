from repositories.forum_message_repository import ForumMessageRepository

class ForumMessageService:
    def __init__(self, forum_message_repository: ForumMessageRepository):
        self.forum_message_repository = forum_message_repository

    def get_all_messages(self, db):
        return self.forum_message_repository.get_all(db)

    def get_message_by_id(self, db, message_id):
        return self.forum_message_repository.get_by_id(db, message_id)

    # Add more message-specific business logic methods here 