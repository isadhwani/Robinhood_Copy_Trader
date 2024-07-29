from cryptography.fernet import Fernet

def generate_encryption_key():
        return Fernet.generate_key().decode()
    
if __name__ == "__main__":
    new_key = generate_encryption_key()
    print(f"Your ENCRYPTION_KEY is: {new_key}")