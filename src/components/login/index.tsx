import { Button, Col, Form, Input, Row, message } from "antd"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authProvider/useAuth"
import { getUserLocalStorage } from "../../context/authProvider/util";

export const Login = () => {
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            history.push("/profile")
            window.location.reload();
        }
    });

    async function onFinish(values: { email: string, password: string }) {
        try {
            await auth.authenticate(values.email, values.password)
            history.push("/profile")
            window.location.reload();
        } catch (error) {
            message.error('Invalid email or password!')
        }
    }

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                height: '100vh'
            }}>
            <Col span={12}>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}>
                    <Form.Item
                        label='Email'
                        name='email'>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}