from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import products, cart, orders, payment, health, events

app = FastAPI(
    title=settings.APP_NAME,
    description="Production-grade API backend for NEXORA - Premium Everyday Tech",
    version="1.0.0"
)

# Enable CORS for PC 1 and all LAN clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permits PC 1 LAN IP and local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(payment.router)
app.include_router(events.router)
app.include_router(health.router)

@app.get("/")
async def root():
    return {
        "brand": "NEXORA",
        "tagline": "Premium Everyday Tech",
        "status": "operational",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
