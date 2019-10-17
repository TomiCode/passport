let apiroute = url => process.env.VUE_APP_BACKEND + url

export const API_AUTH_LOGIN = apiroute("api/v1/auth/login")
export const API_AUTH_REGISTER = apiroute("api/v1/auth/register")

export const API_CONTAINER = apiroute("api/v1/home/container")
export const API_CONTAINER_CREATE = apiroute("api/v1/home/container/create")

export const API_CATEGORIES = apiroute("api/v1/home/categories")
export const API_CATEGORY = apiroute("api/v1/home/category")
export const API_CATEGORY_CREATE = apiroute("api/v1/home/category/create")
