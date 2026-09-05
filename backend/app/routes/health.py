import time
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])

start_time = time.time()

@router.get("/health")
async def health_check():
    return {
        "status": "online",
        "service": "NEXORA Commerce API",
        "uptime_seconds": int(time.time() - start_time),
        "timestamp": int(time.time())
    }
