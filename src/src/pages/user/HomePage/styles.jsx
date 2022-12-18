import styled from "styled-components";

import { Button } from "antd";

import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  @media only screen and (max-width: 576px) {
    & .site-sidebar {
      display: none;
    }
  }
`;

export const CustomLink = styled(Link)`
  color: black;
  font-size: 20px;
  font-weight: 600;
`;

export const Wrapper = styled.div`
  padding: 30px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  & .box-image {
    overflow: hidden;
  }

  & .card-image {
    width: 100%;
    object-fit: cover;
    transition: 0.6s ease;
    display: block;
  }

  & .card-image:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  & .container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  & .image {
    width: 100%;
    object-fit: cover;
    transition: 0.6s ease;
    display: block;
  }

  & .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: rgba(0, 0, 0, 0.3);
  }

  & .text {
    bottom: 15%;
    width: 100%;
    right: 0px;
    top: auto;
    text-align: center;
    opacity: 1;
    color: white;
  }

  & .container:hover {
    .overlay {
      opacity: 1;
    }
    .collection-info {
      opacity: 1;
    }
    .image {
      transform: scale(1.05);
    }
    cursor: pointer;
  }

  & .collection-info {
    position: absolute;
    bottom: 15%;
    width: 100%;
    right: 0px;
    top: auto;
    text-align: center;
    opacity: 0;
    transition: 0.5s ease;
  }

  & .customButton:hover {
    background-color: black;
    color: white;
    border: 2px solid black;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const CustomButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid white;
  color: white;
  font-weight: 500;
`;

export const NavSidebar = styled.div`
  & .site-sidebar {
  }

  & .dropdown-category {
    left: 20px;
    z-index: 10;
    width: 250px;
    padding: 0;
    position: absolute;
    position: fixed;
    top: 180px;
    max-height: calc(100vh - 200px);
    overflow: auto;
  }

  & .menu-category-list {
    list-style: none;
  }

  & .nav-item {
    margin-bottom: 10px;
    max-width: 150px;
    color: "red";
  }

  & .customLink:hover {
    color: #999c03;
  }
`;
