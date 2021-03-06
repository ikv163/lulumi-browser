/**
 * A simple class for fetching images from URLs or files.
 * @class imageUtil
 */
const imageUtil = {
  /**
   * Extracts the image from a valid URL.
   * @param {String} input The input value.
   * @returns {String} The found image encoded by base64.
   */
  getBase64FromImageUrl(input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img: HTMLImageElement = new (window as any).Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onerror = () => {
        reject();
      };
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d')!
          .drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = input;
    });
  },

  /**
   * Puts the image from a imageData object.
   * @param {ImageData} imageData The input imageData object.
   * @param {Number} size The size.
   * @returns {String} The image encoded by base64.
   */
  getBase64FromImageData(imageData: ImageData, size: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const data
     = new ImageData(new Uint8ClampedArray(imageData.data), size, size);
    canvas.getContext('2d')!.putImageData(data, 0, 0);
    return canvas.toDataURL('image/png');
  },

  /**
   * Extracts the scheme from a filepath.
   * @param {String} path The filepath.
   * @param {String} size The size of returned icon (small, normal, large).
   * @returns {String} The found image encoded by base64.
   */
  getBase64FromFileIcon(path: string, size: any = 'normal'): Promise<string> {
    return new Promise((resolve, reject) => {
      require('electron').remote.app.getFileIcon(path, { size }, (err, icon) => {
        if (icon) {
          resolve(icon.toDataURL());
        } else {
          reject(err);
        }
      });
    });
  },

  /**
   * Extracts the valid image from a URL.
   * @param {String} input The input value.
   * @param {Function} cb The callback function.
   */
  getWorkingImageUrl(input: string, cb: Function): void {
    const img = new (window as any).Image();
    img.onload = () => cb(true);
    img.onerror = () => cb(false);
    img.src = input;
  },
};

export default imageUtil;
