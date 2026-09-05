import time
import threading
from typing import Literal, Optional
from pydantic import BaseModel, Field

# Thread-safe sequential counter for backend-generated fallback event IDs
_counter_lock = threading.Lock()
_counter = 0

def _next_event_id() -> str:
    """
    Generates web_NUMBER format IDs for events that arrive without an event_id.
    Frontend-generated IDs (web_000001) are preserved as-is.
    """
    global _counter
    with _counter_lock:
        _counter += 1
        return f"web_{str(_counter).zfill(6)}"


class Event(BaseModel):
    event_id: str = Field(default_factory=_next_event_id)
    event_type: Literal[
        "payment", "order", "activity", "auth",
        "log", "inventory", "pageview", "click",
        "search", "cart", "checkout"
    ]
    timestamp: int = Field(default_factory=lambda: int(time.time()))
    customer_value: float = 0.0
    transaction_value: float = 0.0
    processing_cost: float = 0.0
    data_size: float = 0.0
    region: str = "south-asia"
    # Optional extra context
    source: Optional[str] = "web"
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    product_id: Optional[str] = None
    metadata: Optional[dict] = None

    # Identifier for the sending application
    class_id: str = "nexora-ecommerce-v1"
