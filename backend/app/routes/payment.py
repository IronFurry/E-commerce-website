import random
import time
from fastapi import APIRouter
from app.models.schemas import PaymentRequest, PaymentResponse

router = APIRouter(prefix="/api", tags=["Payment"])

@router.post("/payment", response_model=PaymentResponse)
async def process_payment(req: PaymentRequest):
    # Simulated payment processing
    txn_id = f"TXN_{int(time.time())}_{random.randint(1000, 9999)}"
    
    return PaymentResponse(
        success=True,
        transaction_id=txn_id,
        order_id=req.order_id,
        amount=req.amount,
        timestamp=int(time.time()),
        message=f"Simulated payment of ₹{req.amount:,} authorized via {req.payment_method.upper()}."
    )
