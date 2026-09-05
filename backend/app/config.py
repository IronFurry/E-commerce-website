import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "NEXORA Commerce API"
    HOST: str = "0.0.0.0"
    PORT: int = 9000
    ENVIRONMENT: str = "production"
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
