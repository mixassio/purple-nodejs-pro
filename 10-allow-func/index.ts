
class User {
  @AllouFunc((age: number): boolean => age > 50)
  age: number = 30;
}

function AllouFunc(func: (age: number) => boolean) {
  return (
    target: Object,
    propertyKey: string | symbol
  ) => {
    let value: number;
    const setter = function (newValue: number) {
      if (func(newValue)) {
        console.log('no')
      } else {
        value = newValue;
      }
    }
    const getter = function () {
      return value;
    }
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    })
  }
}

const user1 = new User();
console.log(user1.age)
user1.age = 55;
console.log(user1.age)