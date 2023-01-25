/**
 * 
 * У меня получилось только так сделать, оно работает)
 * Но я до конца не понял почему мне надо кастануть val к any
 * и почему я не могу его кастануть к V
 * 
 */
function swapKeysAndValues<K extends string | number | symbol, V extends string | number | symbol>(obj: Record<K, V>): Record<V, K> {
  const result = {} as any; // ?
  Object.entries(obj)
    .forEach(([key, val]) => {
      result[val as any] = key; // ?
    });
  return result as { [k in V]: K };
}



console.log(swapKeysAndValues({ a: 1, b: 2 }));
