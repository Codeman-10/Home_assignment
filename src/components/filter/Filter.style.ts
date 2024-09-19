import styled from "styled-components";

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  min-height: 70vh;
  padding: 0.5rem 0.25rem;
  margin: 0.5rem;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    p {
      padding:14px;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
    }
  }

  .search_wrapper {
    width: 90%;
  }
  .filter-btn {
    margin-top: auto;
    margin-bottom: 1rem;
    margin-left: 10px;
    margin-right: 10px;
    align-self: stretch;
  }
`;
