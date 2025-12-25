export class LocalStorage<T> {
  key = '';
  constructor(key: string) {
    this.key = key;
  }

  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  get() {
    const json = localStorage.getItem(this.key);
    if (!json) return;
    return JSON.parse(json);
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}
