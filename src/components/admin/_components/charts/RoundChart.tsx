
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from "apexcharts";


const CircularChart = () => {
  const series = [23, 20, 30];

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FF5A5E", "#F0983E", "#7D4479"],
    
    labels: ["A", "B", "C"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          },
        },
        
      },
    },
    legend: {
      position: "bottom",
      offsetX: 0,
      height: 30,
    },
  };

  return (
    <div className="lg:col-span-2  w-full h-full border rounded-xl bg-white space-y-3 sm:space-y-4 p-3 sm:p-4">
    
      <h2 className="font-semibold text-sm sm:text-base">Top Selling</h2>
      <Chart
        width={"100%"}
        options={options}
        series={series}
        height="350"
        type="donut"
      />
    </div>
  );
};

export { CircularChart};
