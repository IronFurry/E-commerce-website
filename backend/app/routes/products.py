from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.database import db

router = APIRouter(prefix="/api", tags=["Products"])

@router.get("/products")
async def get_products(
    category: Optional[str] = Query(None, description="Category name"),
    search: Optional[str] = Query(None, description="Search term"),
    featured: Optional[bool] = Query(None, description="Filter featured products"),
    flash_sale: Optional[bool] = Query(None, description="Filter flash sale items"),
    sort: Optional[str] = Query(None, description="Sort order: price_asc, price_desc, rating")
):
    products = await db.get_all_products(
        category=category,
        search=search,
        featured=featured,
        flash_sale=flash_sale,
        sort_by=sort
    )
    return {"total": len(products), "products": products}

@router.get("/products/{product_id}")
async def get_product(product_id: str):
    product = await db.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Also fetch 4 related products in same category or featured
    all_products = await db.get_all_products()
    related = [
        p for p in all_products 
        if p["id"] != product_id and (p["category"] == product["category"] or p.get("is_featured"))
    ][:4]
    
    return {"product": product, "related": related}

@router.get("/categories")
async def get_categories():
    categories = await db.get_categories()
    return {"categories": categories}
