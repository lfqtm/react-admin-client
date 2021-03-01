import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {Button, Form, Input, message} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import './index.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default class Login extends Component {

    //表单提交
    onFinish = async (values) => {
        // console.log('values', values);
        const { username,password } = values.user
        const result = await reqLogin(username, password)
        // console.log('response', response)
        if (result.status === 0 ) {
            //提示登陆成功
            message.success('登陆成功')

            //保存user
            const user = result.data
            storageUtils.saveUser(user)
            memoryUtils.user = user //保存在内存中


            // replace 和 push（不需要回退到login，所以用replace）
            this.props.history.replace('/')
        } else {
            message.error(result.msg)
        }
    }

    //失败提示
    onFinishFailed = (errorInfo) => {
        console.log('errorInfo', errorInfo);
    }

    render() {
        //判断用户是否登陆
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to='/' />
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name={['user', 'username']}
                            rules={[
                                /*声明式验证，直接使用别人定义好的验证规则*/
                                {required: true, whitespace: true, message: '用户名必填'},
                                {min: 4, message: '用户名至少4位'},
                                {max: 12, message: '用户名至多12位'},
                                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，字母，下划线'},
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'password']}
                            rules={[
                                {required: true, message: '登陆密码必填'},
                                {min: 4, message: '登陆密码至少6位'},
                                {max: 12, message: '登陆密码至多12位'},
                                {pattern: /^[a-zA-Z0-9_]+$/, message: '登陆密码必须是英文，字母，下划线'},]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            dependencies={['user', 'password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    /*验证器（validator）自定义验证*/
                                    validator(_, value) {
                                        if (!value || getFieldValue(['user', 'password']) === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码验证"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*
表单知识点
1、高阶函数
2、高阶组件
3、验证方式：声明式和自定义式
*/

/*
async和await
1、作用？
简化promise对象的使用，不再使用then()来指定成功或失败的回调函数

以同步编码方式来实现异步流程
2、哪里写async
在返回promise的表达好似左侧写await
3、哪里写await
await所在函数（最近的）定义的左侧写async
 */