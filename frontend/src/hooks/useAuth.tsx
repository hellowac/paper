import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "@tanstack/react-router"
import { UsersService, LoginService } from '@/client'
import type {
  Body_login_login_access_token as AccessToken,
  UserPublic,
  UserRegister,
} from '@/client'
import useCustomToast from "./useCustomToast"
import { handleError } from "@/utils"

const CURRENT_USER_QUERY_KEY = ['currentUser']


const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()

  /**
   * 当前用户
   */
  const userQuery = useQuery<UserPublic | null, Error>({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn(),
    retry: false,
  })

  /**
   * 注册
   */
  const signUpMutation = useMutation({
    mutationFn: (data: UserRegister) =>
      UsersService.registerUser({ requestBody: data }),
    onSuccess: () => {
      navigate({ to: '/login' })
    },
    onError: handleError.bind(showErrorToast),
  })

  /**
   * 登录
   */
  const loginMutation = useMutation({
    mutationFn: async (data: AccessToken) => {
      const res = await LoginService.loginAccessToken({
        formData: data,
      })
      localStorage.setItem('access_token', res.access_token)
      return res
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      })
      navigate({ to: userQuery.data?.is_superuser ? '/admin': '/public' })
    },
    onError: handleError.bind(showErrorToast),
  })

  /**
   * 退出登录
   */
  const logout = () => {
    localStorage.removeItem('access_token')
    queryClient.removeQueries({
      queryKey: CURRENT_USER_QUERY_KEY,
    })
    navigate({ to: '/login' })
  }

  return {
    user: userQuery.data,
    userQuery,

    signUpMutation,
    loginMutation,
    logout,

    isAuthenticated: !!userQuery.data,
    isLoadingUser: userQuery.isLoading,
  }
}


export { isLoggedIn, CURRENT_USER_QUERY_KEY }
export default useAuth