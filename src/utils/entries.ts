type TupleEntry<T extends readonly unknown[], I extends unknown[] = [], R = never> =
  T extends readonly [infer Head, ...infer Tail] ?
    TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]> :
    R

type ObjectEntry<T extends {}> =
  T extends object ?
    { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E ?
      E extends [infer K, infer V] ?
        K extends string | number ?
          [`${K}`, V] :
          never :
        never :
      never :
    never

export type Entry<T extends {}> =
  T extends readonly [unknown, ...unknown[]] ?
    TupleEntry<T> :
    T extends ReadonlyArray<infer U> ?
      [`${number}`, U] :
      ObjectEntry<T>

export function entries<T extends {}>(object: T): ReadonlyArray<Entry<T>> {
  return Object.entries(object) as unknown as ReadonlyArray<Entry<T>>;
}