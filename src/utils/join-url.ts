import { z } from "zod"

const segmentsSchema = z.string().array()

// Code from https://github.com/jfromaniello/url-join
export function joinUrl(...segments: string[]): string {
  segmentsSchema.parse(segments)

  if (segments.length === 0) return ""

  // If the first part is a plain protocol, we combine it with the next part.
  if (segments[0].match(/^[^/:]+:\/*$/) && segments.length > 1) {
    const first = segments.shift()
    segments[0] = first + segments[0]
  }

  // There must be two or three slashes in the file protocol, two slashes in anything else.

  if (segments[0].match(/^file:\/\/\//)) {
    segments[0] = segments[0].replace(/^([^/:]+):\/*/, "$1:///")
  } else {
    segments[0] = segments[0].replace(/^([^/:]+):\/*/, "$1://")
  }

  let resultArray = []
  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i]

    if (segment === "") continue

    if (i > 0) {
      // Removing the starting slashes for each component but the first.
      segment = segment.replace(/^[\/]+/, "")
    }
    if (i < segments.length - 1) {
      // Removing the ending slashes for each component but the last.
      segment = segment.replace(/[\/]+$/, "")
    } else {
      // For the last component we will combine multiple slashes to a single one.
      segment = segment.replace(/[\/]+$/, "/")
    }

    resultArray.push(segment)
  }

  let url = resultArray.join("/")
  // Each input component is now separated by a single slash except the possible first plain protocol part.

  // remove trailing slash before parameters or hash
  url = url.replace(/\/(\?|&|#[^!])/g, "$1")

  // replace ? in parameters with &
  const parts = url.split("?")
  url = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&")

  return url
}
