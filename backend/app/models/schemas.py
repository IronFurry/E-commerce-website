from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
import time

class Product(BaseModel):
    id: str
    name: str
    slug: str
    tagline: str
    category: str
    price: int # In INR ₹
    original_price: Optional[int] = None
    discount: Optional[int] = None # Percentage e.g. 25
    rating: float
    review_count: int
    in_stock: bool = True
    stock_count: int = 50
    badge: Optional[str] = None # "Bestseller", "New", "Staff Pick", "-30%"
    description: str
    features: List[str]
    specs: Dict[str, str]
    image: str
    gallery: List[str]
    colors: List[str] = []
    tags: List[str] = []
    is_featured: bool = False
    is_flash_sale: bool = False

class CartItem(BaseModel):
    product_id: str
    name: str
    price: int
    quantity: int = 1
    color: Optional[str] = None
    image: str

class CartUpdate(BaseModel):
    user_id: str
    items: List[CartItem]

class ShippingAddress(BaseModel):
    full_name: str
    email: str
    phone: str
    address_line: str
    city: str
    state: str
    postal_code: str
    country: str = "India"

class OrderRequest(BaseModel):
    user_id: str
    items: List[CartItem]
    shipping_address: ShippingAddress
    payment_method: str # "upi", "card", "netbanking"
    subtotal: int
    discount_amount: int = 0
    shipping_fee: int = 0
    total_amount: int

class Order(BaseModel):
    order_id: str
    user_id: str
    items: List[CartItem]
    shipping_address: ShippingAddress
    payment_method: str
    subtotal: int
    discount_amount: int
    shipping_fee: int
    total_amount: int
    status: str = "confirmed" # confirmed, processing, shipped, delivered
    tracking_number: str
    created_at: int = Field(default_factory=lambda: int(time.time()))

class PaymentRequest(BaseModel):
    order_id: str
    amount: int
    payment_method: str # upi, card, netbanking
    card_last4: Optional[str] = None
    upi_id: Optional[str] = None

class PaymentResponse(BaseModel):
    success: bool
    transaction_id: str
    order_id: str
    amount: int
    timestamp: int
    message: str
