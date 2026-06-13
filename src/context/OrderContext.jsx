'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const token = localStorage.getItem('veeandcee_token')
        const response = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (err) {
        console.error('Failed to fetch orders from database:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const addOrder = async (orderData) => {
    try {
      const token = localStorage.getItem('veeandcee_token')
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      setOrders((current) => [data, ...current])
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('veeandcee_token')
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update order status')
      }

      setOrders((current) => current.map((order) => (order.id === orderId ? data : order)))
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getOrderById = (orderId) => orders.find((order) => order.id === orderId || order._id === orderId)

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)

  return (
    <OrderContext.Provider value={{ orders, loading, addOrder, updateOrderStatus, getOrderById, totalRevenue }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrderContext)
}

export default OrderContext
