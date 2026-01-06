import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/public/_layout/my-borrow')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/public/_layout/my-borrow"!</div>
}
