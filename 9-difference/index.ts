
const a = { a: 5, b: '' , d: 'd'};
const b = { a: 10, c: true };

type A = keyof typeof a
type B = keyof typeof b
type R = Exclude<A, B>
type p = Pick<typeof a, Exclude<keyof typeof a, keyof typeof b>>

function diff<T1 extends object, T2 extends object>(obj1: T1, obj2: T2): Pick<T1, Exclude<keyof T1, keyof T2>> {
  return Object.entries(obj1).reduce<Record<string, any>>((acc, [key, value]) => {
    if (!(key in obj2)) {
        acc[key] = value;
    }
    return acc;
  }, {}) as Pick<T1, Exclude<keyof T1, keyof T2>>;
}

const d = diff(a, b)


