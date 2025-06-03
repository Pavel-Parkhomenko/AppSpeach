const imageCache = new Map();
// ПУСТОЙ MAP
export const preloadImages = async (urls) => {

  await Promise.all(
    urls.map((url) => {
      if (imageCache.has(url)) return Promise.resolve();

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          imageCache.set(url, img);
          resolve();
        };
        img.onerror = reject;
      });
    })
  );
};

export const getCachedImage = (url) => {
  console.log(imageCache)
  return imageCache.get(url);
}