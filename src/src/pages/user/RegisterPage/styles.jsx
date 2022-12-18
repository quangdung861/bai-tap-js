import styled from "styled-components";

export const RegisterContainer = styled.div`
  padding: 100px 0px;
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
`;

export const RegisterContent = styled.div`
  display: flex;
  justify-content: end;

  & .register-title {
    font-size: 22px;
    padding: 22px 0px;
  }

  & .register-form {
    width: 100%;
    max-width: 420px;
    padding: 0 30px 22px 30px;
    background-color: #fff;
  }

  & .register-form .form-item {
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

  & .register-other {
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    Button {
      width: 180px;
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
