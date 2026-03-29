import { client } from "@/lib/amplifyClient"
import {
  OrderItemSelectionSet,
  type CreateOrderItemInput,
  type OrderItem,
  type UpdateOrderItemInput,
} from "@/types"

// OrderItems API
export const getOrderItemsList = async (
  nextTokenParam: string | null = null,
  prevOrderItemsList: OrderItem[] = []
): Promise<OrderItem[]> => {
  const { data, nextToken } = await client.models.OrderItem.list({
    limit: 200,
    nextToken: nextTokenParam,
    selectionSet: OrderItemSelectionSet,
  })
  const orderItemsList = [...prevOrderItemsList, ...data]

  return nextToken
    ? getOrderItemsList(nextToken, orderItemsList)
    : orderItemsList
}

export const getOrderItem = async (id: string): Promise<OrderItem | null> => {
  const { data } = await client.models.OrderItem.get(
    {
      id,
    },
    {
      selectionSet: OrderItemSelectionSet,
    }
  )
  return data
}

export const createOrderItem = async (input: CreateOrderItemInput) => {
  const { data } = await client.models.OrderItem.create(input)
  if (!data) return null
  const orderItem = await getOrderItem(data.id)
  return orderItem
}

export const updateOrderItem = async (input: UpdateOrderItemInput) => {
  const { data } = await client.models.OrderItem.update(input)
  if (!data) return null
  return await getOrderItem(data.id)
}

export const deleteOrderItem = async (orderItem: OrderItem) => {
  const { data } = await client.models.OrderItem.delete({
    id: orderItem.id,
  })
  if (!data) return null
  return orderItem
}
