// unsplash에서 제공하는 image cdn 사용
export default function getParametersForUnsplash(width: number, height: number, quality: number, format: string) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
}
