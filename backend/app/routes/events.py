import asyncio
from fastapi import APIRouter, BackgroundTasks, status
from fastapi.responses import JSONResponse
from app.models.event import Event
from app.pipeline.ingestion import ingest_event, get_recent_events, get_event_counts

router = APIRouter(prefix="/api", tags=["Events"])


@router.post("/events", status_code=status.HTTP_202_ACCEPTED)
async def receive_event(event: Event, background_tasks: BackgroundTasks):
    """
    Lightweight event ingestion endpoint.
    Acknowledges immediately (<2 ms) and processes in background.
    Frontend identifies itself via event.class_id = 'nexora-ecommerce-v1'
    """
    event_dict = event.model_dump()
    background_tasks.add_task(ingest_event, event_dict)
    return {
        "accepted": True,
        "event_id": event.event_id,
        "event_type": event.event_type,
        "class_id": event.class_id,
        "queued_at": event.timestamp
    }


@router.get("/events/recent")
async def recent_events(limit: int = 50):
    events = await get_recent_events(limit)
    return {"total": len(events), "events": events}


@router.get("/events/counts")
async def event_counts():
    counts = await get_event_counts()
    return {"counts": counts, "total": sum(counts.values())}
