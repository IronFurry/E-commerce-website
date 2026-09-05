import random
import time
from fastapi import APIRouter, HTTPException
from app.models.schemas import OrderRequest, Order
from app.database import db

router = APIRouter(prefix="/api", tags=["Orders"])

@router.post("/orders")
async def create_order(order_req: OrderRequest):
    if not order_req.items:
        raise HTTPException(status_code=400, detail="Order items cannot be empty")
    
    order_number = f"NX-{random.randint(10000, 99999)}"
    tracking_number = f"TRK-IN-{random.randint(100000, 999999)}"
    
    order_data = {
        "order_id": order_number,
        "user_id": order_req.user_id,
        "items": [item.model_dump() for item in order_req.items],
        "shipping_address": order_req.shipping_address.model_dump(),
        "payment_method": order_req.payment_method,
        "subtotal": order_req.subtotal,
        "discount_amount": order_req.discount_amount,
        "shipping_fee": order_req.shipping_fee,
        "total_amount": order_req.total_amount,
        "status": "confirmed",
        "tracking_number": tracking_number,
        "created_at": int(time.time())
    }
    
    saved_order = await db.create_order(order_data)
    return {"status": "success", "order": saved_order}

@router.get("/orders/{user_id}")
async def get_orders(user_id: str):
    orders = await db.get_orders(user_id)
    return {"user_id": user_id, "orders": orders}
