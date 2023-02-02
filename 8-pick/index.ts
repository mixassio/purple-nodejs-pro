const user = {
  name: 'Vasiliy',
  age: 8,
  skills: ['typescript', 'javascript'],
};


function pickObjectKeys<T extends object>(obj: T, keys: (keyof T)[]) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (keys.includes(key as keyof T)) {
      acc[key] = value;
    }
    return acc;
  }, {})
}


console.log(pickObjectKeys(user, ['age', 'skills']))