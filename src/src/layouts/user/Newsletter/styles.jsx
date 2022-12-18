import styled from "styled-components";

export const NewsletterContainer = styled.div``;

export const NewsletterContent = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 80px 0px;

  & .form-newsletter {
    margin-top: 50px;
  }

  & .header-title {
    font-size: 24px;
    font-weight: 500;
  }

  & .input-group > button {
    height: 38px;
    width: 100px;
    background-color: #000;
    color: #fff;
  }

  & .input-group > button:hover {
    color: black;
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
  }
`;
