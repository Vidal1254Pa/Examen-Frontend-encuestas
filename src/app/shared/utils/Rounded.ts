export default function (x:number) {
    return Math.round((x + Number.EPSILON) * 100) / 100
  }