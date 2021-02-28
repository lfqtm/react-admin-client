/*
包含所有接口请求函数的模块
 */

import ajax from './ajax'

//登陆
// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }

//登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('//manage/user/add', user, 'POST')

