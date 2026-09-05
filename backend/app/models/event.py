import uuid
import time
from typing import Literal, Optional
from pydantic import BaseModel, Field

class Event(BaseModel):
    event_id: str = Field(default_factory=lambda: f"evt_{uuid.uuid4().hex[:8]}")
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
