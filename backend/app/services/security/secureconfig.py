import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv

load_dotenv()

class SecureConfig:

    def __init__(self):
        self.encryption_key = os.getenv("ENCRYPTION_KEY")
        if not self.encryption_key:
            raise ValueError("ENCRYPTION_KEY not set in environment variables")
        self.f = Fernet(self.encryption_key.encode())

    def get_api_key(self):
        api_key = os.getenv("ENCRYPTED_API_KEY")
        if api_key:
            return self.decrypt(api_key)
        else:
            raise ValueError("API_KEY not set in environment variables")

    def get_private_key(self):
        private_key = os.getenv("ENCRYPTED_PRIVATE_KEY")
        if private_key:
            return self.decrypt(private_key)
        else:
            raise ValueError("PRIVATE_KEY not set in environment variables")
        
    def encrypt(self, value: str) -> str:
        return self.f.encrypt(value.encode()).decode()
    
    def decrypt(self, value: str) -> str:
        return self.f.decrypt(value.encode()).decode()
    
    # def generate_encryption_key():
    #     return Fernet.generate_key().decode()
    
    # if __name__ == "__main__":
    #     new_key = generate_encryption_key()
    #     print(f"Your ENCRYPTION_KEY is: {new_key}")