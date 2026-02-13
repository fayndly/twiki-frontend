const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

export function preloadLottie(url: string): Promise<string> {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)!);
  }

  if (pending.has(url)) {
    return pending.get(url)!;
  }

  const promise = fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      cache.set(url, objectUrl);
      pending.delete(url);
      return objectUrl;
    });

  pending.set(url, promise);
  return promise;
}

export function getLottie(url: string) {
  return cache.get(url);
}
