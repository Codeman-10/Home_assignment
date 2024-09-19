import Highcharts, { SeriesPieOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ProductItem } from "../services/api.types";
import Spinner from "./Spinner";
import { FilterDataProps } from "../types/types";

interface GraphProps extends FilterDataProps {
  loading: boolean;
  categoryList: string[];
}

const Graph: React.FC<GraphProps> = ({
  data,
  categoryList,
  category,
  loading,
}) => {
  let options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: `Prices of ${category}`,
    },
    xAxis: {
      categories: data.map((item: ProductItem) => item.title),
      title: {
        text: "Products",
      },
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        type: "column",
        name: "Price",
        data: data.map((item: ProductItem) => item.price),
      },
    ],
  };
  if (category === "") {
    const data = categoryList.map((name) => ({ name, y: 1 }));
    options = {
      chart: {
        type: "pie",
      },
      title: {
        text: "Category Pie Chart",
      },
      series: [
        {
          type: "pie",
          name: "category",
          data,
        } as SeriesPieOptions,
      ],
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
        },
      },
    };
  }

  return (
    <>
      <div className="header">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        )}
      </div>
    </>
  );
};

export default Graph;
