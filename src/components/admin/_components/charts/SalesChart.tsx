
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from "apexcharts";

export function SalesChart() {
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    
    },
    colors: ["#FF057C", "#8D0B93"],
    dataLabels: {
      enabled: false,
    },
    
    markers: {
      size: 0,
    },

    grid: {
      show: false,
    },
    series: [
      {
        name: "Sales",
        data: [22, 34, 55, 77, 22, 53, 44, 50, 49],
      },
      {
        name: "Orders",
        data: [70, 34, 55, 40, 22, 30, 44, 20, 80],
      },
    ],

    xaxis: {
      labels: {
        show: false,
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
     
    },
  };

  const series = [

        {
          name: "Sales",
          data: [22, 34, 55, 77, 22, 53, 44, 50, 49],
        },
        {
          name: "Orders",
          data: [70, 34, 55, 40, 22, 30, 44, 20, 80],
        },
      
  ];
  return (
    <div className="w-full md:col-span-3 h-fit border space-y-3 bg-white rounded-xl p-3 sm:p-4">
            <h2 className="font-semibold text-sm sm:text-base">Sales Chart</h2>
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="350"
      />
    </div>
  );
}
