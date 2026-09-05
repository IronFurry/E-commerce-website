import asyncio
import time
from collections import deque
from typing import List, Dict

# In-memory event store (up to 10,000 events; ring buffer)
_event_store: deque = deque(maxlen=10_000)
_lock = asyncio.Lock()

# Simple running counters for observability
_counters: Dict[str, int] = {}

async def ingest_event(event_data: dict) -> None:
    """
    Accept and store a single event immediately.
    Non-blocking: returns to caller within microseconds.
    """
    async with _lock:
        event_data["_ingested_at"] = time.time()
        _event_store.appendleft(event_data)
        etype = event_data.get("event_type", "unknown")
        _counters[etype] = _counters.get(etype, 0) + 1

async def get_recent_events(limit: int = 100) -> List[dict]:
    async with _lock:
        return list(_event_store)[:limit]

async def get_event_counts() -> Dict[str, int]:
    async with _lock:
        return dict(_counters)
