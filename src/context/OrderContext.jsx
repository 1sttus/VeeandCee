import { createContext, useContext, useEffect, useState } from 'react'

const ORDERS_KEY = 'veeandcee_orders'

const OrderContext = createContext(null)

function getInitialOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(getInitialOrders)

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }, [orders])

  const addOrder = (order) => {
    setOrders((current) => [order, ...current])
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const getOrderById = (orderId) => orders.find((order) => order.id === orderId)

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById, totalRevenue }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrderContext)
}

export default OrderContext
