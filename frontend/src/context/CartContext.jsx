import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('nexora_cart', JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1, color = null) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product_id === product.id && (color ? i.color === color : true)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product_id: product.id,
            name: product.name,
            price: product.price,
            original_price: product.original_price,
            image: product.image,
            color: color || (product.colors && product.colors[0]) || null,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, color = null) => {
    setItems(prev => prev.filter(i => !(i.product_id === productId && (!color || i.color === color))));
  };

  const updateQuantity = (productId, quantity, color = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setItems(prev => prev.map(i => {
      if (i.product_id === productId && (!color || i.color === color)) {
        return { ...i, quantity };
      }
      return i;
    }));
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NEXORA10' || cleanCode === 'TECH10') {
      setPromoCode(cleanCode);
      setDiscountPercent(10);
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'FIRST20') {
      setPromoCode(cleanCode);
      setDiscountPercent(20);
      return { success: true, message: '20% special discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try NEXORA10' };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 199;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      discountAmount,
      discountPercent,
      promoCode,
      applyPromo,
      removePromo,
      shippingFee,
      totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
