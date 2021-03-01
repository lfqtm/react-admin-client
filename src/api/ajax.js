/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数返回值式promise对象
 *
 * 1、优化：通用处理异常
 * 2、异步获取response.data
 */
import { message } from 'antd'

import axios from 'axios'

export default function ajax(url, data={}, type) {
    return new Promise((resolve, reject) => {
        //1.执行异步ajax请求
        let promise;
        if(type === 'GET') {
            promise = axios.get(url,{ //配置对象
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response => {
            //2.成功了，调用resolve
            resolve(response.data);
        }).catch(error => {
            //3.失败了，不调用reject,错误提示
            message.error('请求出错了：' + error.message)
        })




    });

}

//请求登陆接口
// ajax('/login', {username:'Tom', password: '1234'}, 'POST').then()
//
// ajax('/manage/user/add', {username:'Tom', password: '1234'}, 'POST').then()


