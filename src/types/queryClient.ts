import { QueryClient } from "@tanstack/react-query"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"

import type { Schema } from "../../amplify/data/resource"
import outputs from "../../amplify_outputs.json"

Amplify.configure(outputs)

export const queryClient = new QueryClient()

export const client = generateClient<Schema>()

export type { Schema } from "../../amplify/data/resource"

export enum QueryKeys {
  Products = "products",
}
