
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as `-${string & Properties}`]: Type[Properties]
}

declare module 'sort-by' {
  export function sortBy<T>(...args: (keyof MappedTypeWithNewProperties<T> | keyof T)[]): (a: T, b: T) => number
}