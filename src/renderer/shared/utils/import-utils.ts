/** Splits an array into smaller chunks of a given size */
export const splitIntoChunks = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

/**
 * Converts a base64 string (without prefix) into a Blob object.
 *
 * @param base64 - The base64 string (without "data:image/png;base64," prefix)
 * @param mimeType - The MIME type of the file (default: 'application/octet-stream')
 * @returns A Blob representing the decoded data
 */
export const base64ToBlob = (
  base64: string,
  mimeType: string = 'application/octet-stream',
): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays: Uint8Array[] = [];

  const chunkSize = 512;
  for (let offset = 0; offset < byteCharacters.length; offset += chunkSize) {
    const slice = byteCharacters.slice(offset, offset + chunkSize);
    const byteNumbers = Array.from(slice, (c) => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays as BlobPart[], { type: mimeType });
};

/**
 * Uploads chunks sequentially (one after another).
 *
 * @param chunks - The array of data chunks to upload
 * @param buildFormData - A callback that builds FormData for each chunk
 * @param uploadFn - The upload function (e.g. axios, fetch, etc.)
 * @param onProgress - Optional callback for progress updates (percentage based on total items)
 * @param delayMs - Delay between each upload (default: 200ms)
 */
export const uploadChunksSequentially = async <T>(
  chunks: T[][],
  buildFormData: (chunk: T[], chunkIndex: number, totalChunks: number) => FormData,
  uploadFn: (formData: FormData, chunkIndex: number) => Promise<any>,
  onProgress?: (percent: number) => void,
  delayMs = 200,
) => {
  const totalFiles = chunks.flat().length;
  let uploaded = 0;

  for (let index = 0; index < chunks.length; index++) {
    const formData = buildFormData(chunks[index], index + 1, chunks.length);
    await uploadFn(formData, index + 1);

    uploaded += chunks[index].length;
    const percent = Math.round((uploaded / totalFiles) * 100);
    onProgress?.(percent > 100 ? 100 : percent);

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};
