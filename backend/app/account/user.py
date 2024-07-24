from app.services.robinhood_service import RobinhoodService

from app.account.credentials import Credentials


class User:
    def __init__(self, user_id, credentials: Credentials, robinhood_service: RobinhoodService):
        self.user_id = user_id
        self.credentials = credentials
        self.robinhood_service = robinhood_service


    def __repr__(self):
        return f"<User {self.username}>"

class Users:
    users : dict[int, User] = {}
    last_id = 0

    def add_user(self, credentials: Credentials, robinhood_service: RobinhoodService):
        self.users[self.last_id] = User(self.last_id, credentials, robinhood_service)
        self.last_id += 1
        return self.last_id - 1

    def get_user(self, user_id):
        try :
            user = self.users[user_id]
            return user
        except KeyError:
            return None

    def remove_user(self, user_id):
        del self.users[user_id]

