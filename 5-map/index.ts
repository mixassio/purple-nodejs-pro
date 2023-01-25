
class NodeElement {
  public next: NodeElement | null = null;
  constructor(
    private _key: string,
    private _value: string | number
  ) {}

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  isLast(): boolean {
    return !Boolean(this.next);
  }

  addNode(node: NodeElement): void {
    this.next = node;
  }
}

class MyMap {
  private readonly countBuckets: number = 94; // Символы ASCII с кодом от 33 до 126
  private buckets: (NodeElement | null)[] = Array(this.countBuckets).fill(null);

  hashCode(key: string): number {
    return key ? key[0].charCodeAt(0) - 33 % 94 : 0;
  }

  isNodeElement(el: NodeElement | null): el is NodeElement {
    return el !== null;
  }

  set(key: string, value: string | number): void {
    const hash = this.hashCode(key);
    const newNode: NodeElement = new NodeElement(key, value);
    if (this.buckets[hash] === null) {
      this.buckets[hash] = newNode;
    } else {
      let bucket = this.buckets[hash] as NodeElement;
      let last: boolean = false;
      while(!last) {
        if (bucket.isLast()) {
          bucket.addNode(newNode);
          last = true;
        } else {
          bucket = bucket.next as NodeElement;
        }
      }
    }
  }

  get(key: string): string | number | null {
    const hash = this.hashCode(key);
    let bucket = this.buckets[hash];
    if (!this.isNodeElement(bucket)) {
      return null;
    } else {
      if (key === bucket.key) {
        return bucket.value;
      } 
      let last: boolean = false;
      while (!last) {
        if (this.isNodeElement(bucket.next)) {
          if (bucket.next.key === key) {
            return bucket.next.value;
          } else {
            bucket = bucket.next;
          }
        } else {
          return null;
        }
      }
      return null;
      }
    }

  delete(key: string): boolean {
    const hash = this.hashCode(key);
    let bucket = this.buckets[hash];
    if (!this.isNodeElement(bucket)) {
      return false;
    } else {
      if (key === bucket.key) {
        if (bucket.isLast()) {
          bucket = null;
        } else {
          bucket = bucket.next;
        }
        return true;
      } 
      let last: boolean = false;
      while (!last) {
        if (this.isNodeElement(bucket.next)) {
          if (bucket.next.key === key) {
            if (bucket.next.isLast()) {
              bucket.next = null;
            } else {
              bucket.next = bucket.next.next;
            }
            return true;
          } else {
            bucket = bucket.next;
          }
        } else {
          return false;
        }
      }
      return false;
      }
    }

  clear(): void {
    this.buckets = Array(this.countBuckets).fill(null)
  }

  
}

const myMap = new MyMap();
myMap.set('asdd', 1)
myMap.set('asd2', 2)
myMap.set('asd3', 4)
myMap.get('asd3')
myMap.get('asd2')
myMap.get('asdd')
console.log(myMap.get('asd3'))
console.log(myMap.get('asd2'))
console.log(myMap.get('asdd'))
myMap.delete('asd2')
console.log(myMap.get('asd3'))
console.log(myMap.get('asd2'))
console.log(myMap.get('asdd'))