import { useState, useCallback, useEffect } from "react";
import { DashboardWrapper } from "./Dashboard.style";
import { ProductItem } from "../services/api.types";
import { FilterCriteriaProps, FilterDataProps } from "../types/types";
import Graph from "../components/Graph";
import Filter from "../components/filter/Filter";
import { getProductCategoryList } from "../services/api";

export default function Dashboard(): JSX.Element {
  const [filterData, setFilterData] = useState<FilterDataProps>({
    product: [],
    category: "",
    data: [],
  });
  const [categoryList, setCategoryList] = useState<string[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //added custom spinner of 1 sec
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const result = await getProductCategoryList();
        setCategoryList(result);
      } catch (err) {
        console.log("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    getCategoryList();
  }, []);

  const handleFilter = useCallback(
    (
      filteredData: ProductItem[],
      filterCriteria: FilterCriteriaProps
    ): void => {
      if (filterCriteria.product) setShowSpinner(true);
      setFilterData({
        data: filteredData,
        product: filterCriteria.product,
        category: filterCriteria.category,
      });
      setTimeout(() => setShowSpinner(false), 1000);
    },
    [filterData]
  );

  return (
    <DashboardWrapper>
      <div className="filter">
        <Filter
          categoryList={categoryList}
          handleFilter={handleFilter}
          filterData={filterData}
        />
      </div>
      <div className="graph">
        {!loading && (
          <Graph
            {...filterData}
            categoryList={categoryList}
            loading={showSpinner}
          />
        )}
      </div>
    </DashboardWrapper>
  );
}
