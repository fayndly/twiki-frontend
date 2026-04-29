export type ImgStatus = "loading" | "loaded" | "error";

const MAX = 200;

class ImageStatusLRU {
  private map = new Map<string, ImgStatus>();

  get(key: string): ImgStatus | undefined {
    const value = this.map.get(key);
    if (!value) return undefined;

    this.map.delete(key);
    this.map.set(key, value);

    return value;
  }

  set(key: string, value: ImgStatus) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }

    this.map.set(key, value);

    if (this.map.size > MAX) {
      const first = this.map.keys().next().value;
      first && this.map.delete(first);
    }
  }

  clear() {
    this.map.clear();
  }
}

export const imageStatusStore = new ImageStatusLRU();
