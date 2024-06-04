
export type QueryResultKeys<Query> = keyof Omit<Query, "__typename">;