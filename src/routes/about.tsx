import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage
})

const youtubeLink = "https://youtu.be/FHKsPazBrno"

function AboutPage() {
  window.location.href = youtubeLink

  return null
}
