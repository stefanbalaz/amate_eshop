export enum SortDirection {
  asc = "asc",
  desc = "desc",
}

export type KeysEnum<T> = { [P in keyof Required<T>]: true }

export type FieldConstruct<T> = {
  type:
    | "id"
    | "string"
    | "enum"
    | "integer"
    | "float"
    | "boolean"
    | "date"
    | "time"
    | "datetime"
    | "timestamp"
    | "object"
    | "entity"
    | "email"
    | "phone"
  isArray: boolean
  isRequired: boolean
  isSortable: boolean
  isSearchable: boolean
  formatter: (value: T) => string
}

// export type TypeKeysEnum<T> = { [P in keyof Required<T>]: FieldConstruct<T> };

// TypeKeysEnum now also takes a mapping for R per key
export type TypeKeysEnum<T> = {
  [P in keyof Required<T>]: FieldConstruct<T>
}
