import asyncio
from typing import Dict, List, Optional
from app.data.seed_products import SEED_PRODUCTS, CATEGORIES
from app.models.schemas import Product, CartItem, Order

class Database:
    def __init__(self):
        self._products: Dict[str, dict] = {p["id"]: p for p in SEED_PRODUCTS}
        self._categories: List[dict] = CATEGORIES
        self._carts: Dict[str, List[dict]] = {}
        self._orders: Dict[str, List[dict]] = {}
        self._lock = asyncio.Lock()

    async def get_all_products(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        featured: Optional[bool] = None,
        flash_sale: Optional[bool] = None,
        sort_by: Optional[str] = None, # "price_asc", "price_desc", "rating"
    ) -> List[dict]:
        async with self._lock:
            results = list(self._products.values())

        if category and category.lower() != "all":
            results = [
                p for p in results 
                if p["category"].lower() == category.lower() 
                or p.get("slug", "").lower() == category.lower()
            ]

        if search:
            q = search.lower().strip()
            results = [
                p for p in results
                if q in p["name"].lower()
                or q in p["tagline"].lower()
                or q in p["category"].lower()
                or any(q in t.lower() for t in p.get("tags", []))
            ]

        if featured is not None:
            results = [p for p in results if p.get("is_featured") == featured]

        if flash_sale is not None:
            results = [p for p in results if p.get("is_flash_sale") == flash_sale]

        if sort_by == "price_asc":
            results.sort(key=lambda x: x["price"])
        elif sort_by == "price_desc":
            results.sort(key=lambda x: x["price"], reverse=True)
        elif sort_by == "rating":
            results.sort(key=lambda x: x["rating"], reverse=True)

        return results

    async def get_product_by_id(self, product_id: str) -> Optional[dict]:
        async with self._lock:
            return self._products.get(product_id)

    async def get_categories(self) -> List[dict]:
        return self._categories

    async def get_cart(self, user_id: str) -> List[dict]:
        async with self._lock:
            return self._carts.get(user_id, [])

    async def update_cart(self, user_id: str, items: List[dict]) -> List[dict]:
        async with self._lock:
            self._carts[user_id] = items
            return self._carts[user_id]

    async def create_order(self, order_data: dict) -> dict:
        async with self._lock:
            user_id = order_data["user_id"]
            if user_id not in self._orders:
                self._orders[user_id] = []
            self._orders[user_id].insert(0, order_data)
            # Clear user cart on successful order
            self._carts[user_id] = []
            return order_data

    async def get_orders(self, user_id: str) -> List[dict]:
        async with self._lock:
            return self._orders.get(user_id, [])

db = Database()
