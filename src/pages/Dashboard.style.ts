import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  min-height: 100vh;
  .filter {
    width: 30%;
  }
  .graph {
    width: 70%;
    text-align: center;
  }
`;
