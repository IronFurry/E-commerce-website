from fastapi import APIRouter, HTTPException
from app.models.schemas import CartUpdate
from app.database import db

router = APIRouter(prefix="/api", tags=["Cart"])

@router.get("/cart/{user_id}")
async def get_cart(user_id: str):
    items = await db.get_cart(user_id)
    subtotal = sum(item["price"] * item["quantity"] for item in items)
    return {"user_id": user_id, "items": items, "subtotal": subtotal}

@router.post("/cart")
async def update_cart(cart_data: CartUpdate):
    items_dict = [item.model_dump() for item in cart_data.items]
    updated = await db.update_cart(cart_data.user_id, items_dict)
    subtotal = sum(item["price"] * item["quantity"] for item in updated)
    return {"status": "success", "user_id": cart_data.user_id, "items": updated, "subtotal": subtotal}
