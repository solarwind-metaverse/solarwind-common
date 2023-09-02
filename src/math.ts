
import { StarLocation } from './model/star'

export function getStarLocation(icrsRA: string, icrsDec: string, parallax: number, pmRa: number, pmDec: number): StarLocation {

  const ra = degreesToRadians(convertRaToDegrees(icrsRA))
  const dec = degreesToRadians(convertToDecimal(icrsDec))

  if (ra === 0 && dec === 0) {
    return { x: 0, y: 0, z: 0 }
  }

  // Convert the parallax from milliarcseconds to parsecs
  const parallaxParsecs = 1 / (parallax / 1000)

  // Calculate the distance in parsecs
  const x = parallaxParsecs * (Math.cos(ra) * Math.cos(dec))
  const y = parallaxParsecs * (Math.sin(ra) * Math.cos(dec))
  const z = parallaxParsecs * Math.sin(dec)

  // Adjust for proper motion
  const pmRaLY = pmRa * parallaxParsecs
  const pmDecLY = pmDec * parallaxParsecs
  const xAdjusted = x + (pmRaLY / 3600000)
  const yAdjusted = y + (pmDecLY / 3600000)

  return {
    x: xAdjusted,
    y: yAdjusted,
    z
  }

}

// Helper function to convert RA from hours to degrees
export function convertRaToDegrees(ra: string): number {

  const parts = ra.split(' ')
  const hours = Number(parts[0])
  const minutes = Number(parts[1])
  const seconds = Number(parts[2])

  return (hours + minutes / 60 + seconds / 3600) * 15

}

// Helper function to convert Dec from string to decimal degrees
export function convertToDecimal(coord: string): number {

  const parts = coord.split(' ')
  let dStr = parts[0]
  let sign = 1
  if (dStr.startsWith('-')) {
    dStr = dStr.substring(1)
    sign = -1
  } else if (dStr.startsWith('+')) {
    dStr = dStr.substring(1)
    sign = 1
  }

  const deg = parseInt(dStr)
  const min = parseInt(parts[1])
  const sec = parseFloat(parts[2].replace(',', '.'))
  return sign * (deg + min / 60 + sec / 3600)

}

// Helper function to convert degrees to radians
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function calculateDistance(starLocationA: StarLocation, starLocationB: StarLocation): number {

  const xDiff = starLocationA.x - starLocationB.x
  const yDiff = starLocationA.y - starLocationB.y
  const zDiff = starLocationA.z - starLocationB.z

  return Math.sqrt(xDiff ** 2 + yDiff ** 2 + zDiff ** 2)

}

export function getRoundedDistance(starLocationA: StarLocation, starLocationB: StarLocation, lightYears?: boolean): number {

  let dist = calculateDistance(starLocationA, starLocationB)
  if (lightYears) {
    dist = dist * 3.26156
  }

  return Math.round(dist * 100) / 100

}

export function parsecsToLy(parsecs: number, round?: boolean): number {
  const ly = parsecs * 3.26156
  return round ? Math.round(ly * 100) / 100 : ly
}

export function getDistanceFromSunInLightYears({ x, y, z }: StarLocation): number {

  const distanceParsecs = Math.sqrt(x * x + y * y + z * z)
  // Convert the distance from parsecs to light years
  const distanceLightYears = distanceParsecs * 3.26156
  return distanceLightYears

}

export function distanceBetweenStars(
  star1RA: string,
  star1Dec: string,
  star1Parallax: number,
  star2RA: string,
  star2Dec: string,
  star2Parallax: number
): number {
  // Convert the ICRS coordinates to radians for both stars
  const ra1 = degreesToRadians(convertRaToDegrees(star1RA))
  const dec1 = degreesToRadians(convertToDecimal(star1Dec))
  const ra2 = degreesToRadians(convertRaToDegrees(star2RA))
  const dec2 = degreesToRadians(convertToDecimal(star2Dec))

  // Convert the parallax from milliarcseconds to parsecs for both stars
  const star1ParallaxParsecs = 1 / (star1Parallax / 1000)
  const star2ParallaxParsecs = 1 / (star2Parallax / 1000)

  // Calculate the distance in parsecs between the stars
  const x = (star1ParallaxParsecs * Math.cos(ra1) * Math.cos(dec1)) -
    (star2ParallaxParsecs * Math.cos(ra2) * Math.cos(dec2))
  const y = (star1ParallaxParsecs * Math.sin(ra1) * Math.cos(dec1)) -
    (star2ParallaxParsecs * Math.sin(ra2) * Math.cos(dec2))
  const z = (star1ParallaxParsecs * Math.sin(dec1)) - (star2ParallaxParsecs * Math.sin(dec2))
  const distanceParsecs = Math.sqrt(x * x + y * y + z * z)

  // Convert the distance from parsecs to light years
  const distanceLightYears = distanceParsecs * 3.26156

  return distanceLightYears

}

export function distanceToStar(icrsRA: string, icrsDec: string, parallax: number): number {

  // Convert the ICRS coordinates to radians
  const ra = degreesToRadians(convertRaToDegrees(icrsRA))
  const dec = degreesToRadians(convertToDecimal(icrsDec))

  // Convert the parallax from milliarcseconds to parsecs
  const parallaxParsecs = 1 / (parallax / 1000)

  // Calculate the distance in parsecs
  const x = parallaxParsecs * (Math.cos(ra) * Math.cos(dec))
  const y = parallaxParsecs * (Math.sin(ra) * Math.cos(dec))
  const z = parallaxParsecs * Math.sin(dec)
  const distanceParsecs = Math.sqrt(x * x + y * y + z * z)

  // Convert the distance from parsecs to light years
  const distanceLightYears = distanceParsecs * 3.26156

  return distanceLightYears

}
