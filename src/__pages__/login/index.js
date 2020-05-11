import React, { useCallback, useRef, useContext } from 'react';
import GlobalContext from 'global';
import { useNavigate, useLocation } from '@reach/router';
import { Form, Input, Button, Row, Col, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';

import css from './styles.module.scss';
import RegisterModal from './register-modal';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state || {};
  const global = useContext(GlobalContext);

  // reference to register modal dialog
  const registerModalRef = useRef();

  /**
   * Trigger when click login button
   */
  const onSubmit = useCallback(
    formData => {
      message.info(`${formData.username} - ${formData.password}`, 3);

      // redirecto to dashboard page
      window.sessionStorage.setItem('account', JSON.stringify(formData));
      navigate(routeState.redirectTo || '/', { replace: true });
    },
    [navigate, routeState.redirectTo]
  );

  /**
   * Trigger when error occurs
   */
  const onLoginFailed = useCallback(err => {
    message.error(err.toString(), 3);
  }, []);

  /**
   * Trigger when user click on register button link
   */
  const onRegisterBtnClick = useCallback(() => {
    registerModalRef.current.show({});
  }, []);

  /**
   * On register submit
   */
  const onRegisterModalSubmit = useCallback(
    (originData, formData) => {
      // show loading progress
      global.loadingRef.current.show();

      // Handle some workload here
      setTimeout(() => {
        message.info(`register modal submitted - ${formData.username}`, 3);

        // close loading progress
        global.loadingRef.current.hide();
      }, 1000);
    },
    [global.loadingRef]
  );

  /**
   * ON register modal close
   */
  const onRegisterModalClose = useCallback(() => {
    message.info('register modal closed', 3);
  }, []);

  return (
    <>
      <Row style={{ height: '100%', alignItems: 'center' }}>
        <Col span={12} offset={6} lg={{ span: 8, offset: 8 }}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onLoginFailed}
          >
            <Form.Item
              label={t('username')}
              name="username"
              rules={[{ required: true, message: `${t('username.require')}` }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('password')}
              name="password"
              rules={[{ required: true, message: `${t('password.require')}` }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space className={css['login-footer']}>
                <Button type="link" onClick={onRegisterBtnClick}>
                  {t('register.new')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {t('login')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <RegisterModal ref={registerModalRef} onSubmit={onRegisterModalSubmit} onClose={onRegisterModalClose} />
    </>
  );
};

export default Login;
