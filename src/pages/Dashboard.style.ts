import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: flex;
    @media (max-width: 480px) {
  flex-direction: column;
  }
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  min-height: 100vh;
  .filter {
    min-width: 30%;
  }
  .graph {
    min-width: 70%;
    text-align: center;
  }
`;
