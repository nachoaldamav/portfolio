export function generateRadius(min: number, max: number) {
  const result = `${random(min, max)}% ${random(min, max)}% ${random(
    min,
    max
  )}% ${random(min, max)}%`
  console.log(result)
  return result
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
