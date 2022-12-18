import styled from "styled-components";

// CSS cho Component trong antd

// import { Radio } from "antd";

// export const CustomForm = styled(Form)`
//   margin: 0px 100px;
// `;

export const MainContainer = styled.div`
  padding: 50px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
export const MainContent = styled.div`
  & .container-top {
    background-color: white;
  }

  & .card-left {
    padding: 16px;

    & .card-media {
      display: flex;
      align-items: center;
      margin-top: 16px;

      & > div {
        padding: 0px 30px;
        display: flex;
        align-items: center;
      }

      & .liked {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #ccc;
      }
    }
  }

  & .card-right {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    padding: 16px;
    height: 100%;

    & .product-rate {
      margin-top: 8px;
      display: flex;
      align-items: flex-end;
    }

    & .product-price {
      margin-top: 12px;
      margin-bottom: 20px;
    }
  }

  & .product-info-options > div {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  & .product-info-options .option-title {
    width: 150px;
  }

  & .btn-edit-review {
    cursor: pointer;
    color: #757575;
    font-weight: 500;
    margin-top: 5px;
  }

  & .btn-edit-review:hover {
    color: #999c03;
  }

  ///

  & .card {
    overflow: hidden;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 0.125rem;
    margin-top: 16px;
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

export const Wraper = styled.div`
  padding: 16px;
  & img {
    width: 80%;
    height: auto;
  }
`;
