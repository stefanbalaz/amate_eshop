import { client } from "@/lib/amplifyClient"
import {
  OrderSelectionSet,
  type CreateOrderInput,
  type Order,
  type UpdateOrderInput,
} from "@/types"

// Orders API
export const getOrdersList = async (
  nextTokenParam: string | null = null,
  prevOrdersList: Order[] = []
): Promise<Order[]> => {
  const { data, nextToken } = await client.models.Order.list({
    limit: 200,
    nextToken: nextTokenParam,
    selectionSet: OrderSelectionSet,
  })
  const ordersList = [...prevOrdersList, ...data]

  return nextToken ? getOrdersList(nextToken, ordersList) : ordersList
}

export const getOrder = async (id: string): Promise<Order | null> => {
  const { data } = await client.models.Order.get(
    {
      id,
    },
    {
      selectionSet: OrderSelectionSet,
    }
  )

  return data
}

export const createOrder = async (input: CreateOrderInput) => {
  console.log("Creating order with input:", input)

  const { data, errors } = await client.models.Order.create(input)

  console.log("Order created with data:", data)
  console.log("Order creation errors:", errors)

  if (!data) return null

  const order = await getOrder(data.id)

  return order
}

export const updateOrder = async (input: UpdateOrderInput) => {
  const { data } = await client.models.Order.update(input)

  if (!data) return null

  return await getOrder(data.id)
}

export const deleteOrder = async (order: Order) => {
  const { data } = await client.models.Order.delete({
    id: order.id,
  })

  if (!data) return null

  return order
}

export const isOrderUsed = (_order: Order): boolean => {
  console.log("Checking if Order is used:", _order)
  return true
}
