
import os
from secureconfig import SecureConfig
from dotenv import load_dotenv

load_dotenv()

def encrypt_keys():
    config = SecureConfig()
    
    api_key = os.getenv("API_KEY")
    private_key = os.getenv("PRIVATE_KEY")

    if not api_key or not private_key:
        print("API_KEY or PRIVATE_KEY not set in environment variables")
        return

    encrypted_api_key = config.encrypt(api_key)
    encrypted_private_key = config.encrypt(private_key)

    print(f"ENCRYPTED_API_KEY={encrypted_api_key}\n")
    print(f"ENCRYPTED_PRIVATE_KEY={encrypted_private_key}\n")
    print("\nAdd these to your .env file as ENCRYPTED_API_KEY and ENCRYPTED_PRIVATE_KEY")

if __name__ == "__main__":
    encrypt_keys()