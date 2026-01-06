import {
  createFileRoute,
  redirect
} from "@tanstack/react-router"
import { UsersService } from '@/client'

import { isLoggedIn } from "@/hooks/useAuth"

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
  beforeLoad: async () => {

    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    } else {
      throw redirect({
        to: "/public",
      })

    }

    // const user = await UsersService.readUserMe()

    // throw redirect({
    //   to: user.is_superuser ? '/admin' : '/public',
    // })

  },
  head: () => ({
    meta: [
      {
        title: "登录 - WAC图书管理系统",
      },
    ],
  }),
})

function RouteComponent() {

  return null
}
