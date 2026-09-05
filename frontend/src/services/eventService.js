/**
 * NEXORA Event Service
 * Centralised client-side telemetry dispatcher.
 * 
 * Every event sent to the backend includes:
 *   - event_id       (auto-generated)
 *   - event_type     (payment | order | activity | auth | log | inventory | ...)
 *   - timestamp      (unix epoch seconds)
 *   - customer_value (estimated lifetime / cart value of the user)
 *   - transaction_value (rupee value of the specific action)
 *   - processing_cost   (estimated internal cost for this event type)
 *   - data_size         (payload bytes estimate)
 *   - region            (detected or default)
 *   - source, user_id, session_id, product_id, metadata
 *   - class_id: "nexora-ecommerce-v1"   ← identifies this website to the pipeline
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

// Stable session ID for this browser tab
const SESSION_ID = `sess_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;

// Cost weights (processing_cost) per event type for pipeline prioritisation
const PROCESSING_COST_MAP = {
  payment:   0.95,
  order:     0.90,
  inventory: 0.80,
  auth:      0.60,
  checkout:  0.55,
  cart:      0.40,
  search:    0.25,
  activity:  0.10,
  pageview:  0.08,
  click:     0.05,
  log:       0.02,
};

/**
 * Generate a short unique event ID
 * @returns {string}
 */
function generateEventId() {
  const chars = 'abcdef0123456789';
  let id = 'evt_';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

/**
 * Detect region from locale (simplified for India routing)
 * @returns {string}
 */
function detectRegion() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'south-asia-in';
    if (tz.startsWith('Asia/')) return 'asia';
    if (tz.startsWith('America/')) return 'americas';
    if (tz.startsWith('Europe/')) return 'europe';
  } catch {
    // ignore
  }
  return 'global';
}

/**
 * Main event dispatcher.
 * Fire-and-forget — never blocks the UI.
 * 
 * @param {object} params
 * @param {string} params.event_type   - Event type (e.g. 'payment', 'order', 'cart')
 * @param {string} [params.user_id]    - User identifier
 * @param {string} [params.product_id] - Product identifier if applicable
 * @param {number} [params.transaction_value] - INR value of action
 * @param {number} [params.customer_value]    - Estimated customer LTV
 * @param {object} [params.metadata]   - Extra context (query, method, etc.)
 */
export async function sendEvent({
  event_type,
  user_id = null,
  product_id = null,
  transaction_value = 0,
  customer_value = 0,
  metadata = {},
}) {
  const payload = {
    event_id: generateEventId(),
    event_type,
    timestamp: Math.floor(Date.now() / 1000),
    customer_value: Number(customer_value) || 0,
    transaction_value: Number(transaction_value) || 0,
    processing_cost: PROCESSING_COST_MAP[event_type] ?? 0.1,
    data_size: JSON.stringify(metadata).length / 1024,  // KB estimate
    region: detectRegion(),
    source: 'web',
    user_id: user_id || null,
    session_id: SESSION_ID,
    product_id: product_id || null,
    metadata,
    class_id: 'nexora-ecommerce-v1',
  };

  try {
    await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Silently swallow — events must never break the shopping experience
    console.debug('[NEXORA telemetry] event dispatch failed silently:', event_type, err?.message);
  }
}

/**
 * Convenience helpers for common event types
 */

export const Events = {
  pageview: (userId, productId, metadata = {}) =>
    sendEvent({ event_type: 'pageview', user_id: userId, product_id: productId, metadata }),

  click: (userId, productId, metadata = {}) =>
    sendEvent({ event_type: 'click', user_id: userId, product_id: productId, metadata }),

  search: (userId, query, resultCount = 0) =>
    sendEvent({ event_type: 'search', user_id: userId, metadata: { query, result_count: resultCount } }),

  cart: (userId, product, quantity, action = 'add') =>
    sendEvent({
      event_type: 'cart',
      user_id: userId,
      product_id: product?.id,
      transaction_value: (product?.price || 0) * quantity,
      customer_value: (product?.price || 0) * quantity,
      metadata: { action, quantity, product_name: product?.name },
    }),

  checkout: (userId, totalAmount, itemCount) =>
    sendEvent({
      event_type: 'checkout',
      user_id: userId,
      transaction_value: totalAmount,
      customer_value: totalAmount,
      metadata: { item_count: itemCount },
    }),

  order: (userId, orderId, totalAmount, itemCount, paymentMethod) =>
    sendEvent({
      event_type: 'order',
      user_id: userId,
      transaction_value: totalAmount,
      customer_value: totalAmount * 1.5,   // orders represent higher LTV signal
      metadata: { order_id: orderId, item_count: itemCount, payment_method: paymentMethod },
    }),

  payment: (userId, orderId, totalAmount, paymentMethod, transactionId) =>
    sendEvent({
      event_type: 'payment',
      user_id: userId,
      transaction_value: totalAmount,
      customer_value: totalAmount * 2,      // completed payment = highest LTV signal
      metadata: {
        order_id: orderId,
        transaction_id: transactionId,
        payment_method: paymentMethod,
        currency: 'INR',
      },
    }),

  auth: (userId, action = 'login') =>
    sendEvent({ event_type: 'auth', user_id: userId, metadata: { action } }),

  inventory: (productId, stockChange, reason) =>
    sendEvent({
      event_type: 'inventory',
      product_id: productId,
      metadata: { stock_change: stockChange, reason },
    }),

  activity: (userId, action, metadata = {}) =>
    sendEvent({ event_type: 'activity', user_id: userId, metadata: { action, ...metadata } }),

  log: (level, message, metadata = {}) =>
    sendEvent({ event_type: 'log', metadata: { level, message, ...metadata } }),
};
