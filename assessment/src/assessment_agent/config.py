from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-4o-mini"
    database_url: str
    allowed_origins: str = "http://localhost:4321"
    port: int = 8000

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


_settings: Settings | None = None


def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = Settings()  # type: ignore[call-arg]
    return _settings


# Convenience alias used throughout the codebase. Accessed as a module
# attribute so it resolves lazily (only when first used at runtime, not at
# import time).
class _SettingsProxy:
    """Thin proxy that defers Settings construction to first attribute access."""

    def __getattr__(self, name: str):
        return getattr(get_settings(), name)


settings: Settings = _SettingsProxy()  # type: ignore[assignment]
