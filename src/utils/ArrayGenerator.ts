function generateRandomNumber (min: number = 1, max: number = 100) : number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
function shuffleArray<T>(array: T[]): T[] {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
  
export default function GenerateArray(size:number) : number[] {
  let array:number[] = []
  for (let i = 0; i < size; i++) {
    array.push(generateRandomNumber(i*10+1, (i+1)*10));
  }
  shuffleArray(array);
  return array;
}
