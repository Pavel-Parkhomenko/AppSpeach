const imageCache = new Map();

export const preloadImages = async (urls, callback) => {

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

  callback(true)
  console.log("Картинки загруженны")
};

export const getCachedImage = (url) => {
  // console.log(url)
  return imageCache.get(url);
}