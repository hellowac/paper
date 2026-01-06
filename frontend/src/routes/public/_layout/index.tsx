import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/public/_layout/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "首页 - WAC图书管理系统",
      },
    ],
  }),
})

function RouteComponent() {
  return <div>Hello "/public/_layout/"! public</div>
}
