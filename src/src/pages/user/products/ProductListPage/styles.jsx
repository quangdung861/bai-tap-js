import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 50px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  & .card-filter {
    padding: 16px;
    background-color: white;
    margin-bottom: 16px;
  }

  & .checkbox-option:hover {
    color: #999c03;
  }
`;

export const MainContent = styled.div`
  & .card {
    overflow: hidden;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 0.125rem;
  }

  & .card-title {
    .name {
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
  }

  & .similar {
    display: none;
    background-color: #ee4d2d;
    color: white;
    text-align: center;
    line-height: 1.875rem;
    border: 1px solid #ee4d2d;
    border-radius: 0.125rem;
    position: absolute;
    width: 100%;
    z-index: 1;
    cursor: pointer;
  }

  & .card-hover:hover {
    .similar {
      display: block;
    }
  }

  & .box-image {
    overflow: hidden;
  }

  & .card-image {
    height: 220px;
    width: 100%;
    object-fit: cover;
    flex-shrink: 0;
    transition: 0.6s;
  }

  & .card-image:hover {
    transform: scale(1.1);
  }

  & .card .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 132px;
    color: black;
    overflow: hidden;
    padding: 8px;
  }
  & .card-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    color: #ee4d2d;
    padding-top: 8px;
  }

  & .card-rate {
    display: flex;
    align-items: flex-end;
  }
`;
