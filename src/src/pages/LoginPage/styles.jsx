import styled from "styled-components";

export const LoginContainer = styled.div`
  padding: 100px 0px;
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
`;

export const LoginContent = styled.div`
  display: flex;
  justify-content: end;

  & .login-title {
    font-size: 22px;
    padding: 22px 0px;
  }

  & .login-form {
    padding: 0 30px 22px 30px;
    width: 100%;
    max-width: 420px;
    background-color: #fff;
  }

  & .login-form .form-item {
    margin-bottom: 16px;
  }

  & .space-line {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
  }

  & .space-line span {
    color: #dbdbdb;
    padding: 0px 16px;
  }

  & .line {
    height: 1px;
    flex: 1;
    background-color: #dbdbdb;
  }

  & .login-other {
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    Button {
      width: 118px;
      height: 42px;
      font-size: 15px;
    }
    Button img {
      width: 20px;
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }

  & .policy {
    text-align: center;
    padding-bottom: 24px;
    p {
      margin: 0;
    }
  }

  & .navigate-login {
    text-align: center;
    padding-bottom: 10px;
  }
`;
