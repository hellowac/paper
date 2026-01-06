import { createFileRoute, Outlet, Link as NavLink, useRouterState } from '@tanstack/react-router'
import { ChevronsUpDown, LogOut, Settings } from "lucide-react"

import useAuth, { isLoggedIn } from "@/hooks/useAuth"


import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'

import { getInitials } from "@/utils"

export const Route = createFileRoute('/public/_layout')({
  component: RouteComponent
})


const items = [
  { title: "首页", path: "/public" },
  { title: "图书", path: "/public/books" },
  { title: "我的借阅", path: "/public/my-borrow" },
]

function RouteComponent() {
  const { user: currentUser } = useAuth()

  const router = useRouterState()
  const currentPath = router.location.pathname

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            WAC图书管理系统
          </h1>

          <nav className="space-x-6">
            {items.map((item) => {
              const isActive = currentPath === item.path

              return (<NavLink
                key={item.path}
                to={item.path}
                activeOptions={{exact: true}}
                activeProps={{
                  className: 'text-blue-600 font-medium'
                }}
                inactiveProps={{
                  className: 'text-gray-600'
                }}
              >
                {item.title}
              </NavLink>)
            })}

            {!currentUser && (<NavLink
              to='/login'
            >
              登录
            </NavLink>)}

            {currentUser && (<UserDrop user={currentUser} />)}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          © 2026 基于 FastAPI 的图书管理系统
        </div>
      </footer>
    </div>
  );
}


interface UserInfoProps {
  fullName?: string
  email?: string
}

function UserInfo({ fullName, email }: UserInfoProps) {
  return (
    <div className="flex items-center gap-2.5 w-full min-w-0">
      {fullName || "User"}
      {/* <div className="flex flex-col items-start min-w-0">
        <p className="text-sm font-medium truncate w-full">{fullName}</p>
        <p className="text-xs text-muted-foreground truncate w-full">{email}</p>
      </div> */}
    </div>
  )
}

function UserDrop({ user }: { user: any }) {
  const { logout } = useAuth()
  const handleLogout = async () => {
    logout()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          // size="lg"
          variant={'ghost'}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          data-testid="user-menu"
        >
          <UserInfo fullName={user?.full_name} email={user?.email} />
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-28 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        {/* <DropdownMenuLabel className="p-0 font-normal">
              <UserInfo fullName={user?.full_name} email={user?.email} />
            </DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <NavLink to="/admin/settings" >
          <DropdownMenuItem>
            <Settings />
            用户设置
          </DropdownMenuItem>
        </NavLink>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
