import React, { memo, useEffect, useRef, useState } from "react";
import bgChart from "../assets/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import _ from "lodash";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import icons from "../ultis/icons";

const { BsFillPlayFill } = icons;

const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0, // chế độ hiển thị
    top: 0, // tọa độ trục X
    left: 0, // tọa độ trục Y
  }); // tooltipCustom
  const [selected, setSelected] = useState(null); // state lưu trữ encodeId của tooltip đang hover chuột vào point
  const chartRef = useRef(); // <Line />

  const options = {
    responsive: true, // cho phép responsive
    pointRadius: 0, // đặt bán kính của các điểm dữ liệu trong biểu đồ thành 0, ẩn chúng một cách hiệu quả
    maintainAspectRatio: false, // vô hiệu hóa bảo trì tỷ lệ khung hình của biểu đồ, cho phép biểu đồ có chiều rộng và chiều cao đáp ứng một cách độc lập.
    scales: {
      // xác định cấu hình cho tỷ lệ (trục) của biểu đồ.
      y: {
        // trục y
        ticks: { display: false }, // cấu hình cho các tick trục y. display: false ẩn các nhãn đánh dấu
        grid: { color: "rgba(255, 255, 255, 0.1)", drawTicks: false }, // cấu hình cho các đường lưới trục y, color đặt màu cho các đường lưới
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        // trục x
        ticks: { color: "white" }, // cấu hình cho các tick trục x
        grid: { color: "transparent" }, // cấu hình cho các đường lưới trục x. color: "transparent" làm cho các đường lưới trở nên trong suốt
      },
    },
    plugins: {
      // cấu hình các plugin bổ sung cho biểu đồ
      legend: false, // tắt hiển thị chú giải biểu đồ.
      tooltip: {
        enabled: false, // vô hiệu hóa tooltip do react-chartjs-2 cung cấp
        external: ({ tooltip }) => {
          // Khởi tạo một custom tooltip là một hàm nhận object tooltip làm tham số và trả về logic của tooltip
          // console.log(tooltip);
          if (!chartRef || !chartRef.current) return;

          if (tooltip.opacity === 0) {
            // Nếu opcity của tooltip là 0 (người dùng bỏ chuột ra khỏi điểm point)
            if (tooltipState.opacity !== 0)
              // Nếu opacity của tooltipState (custom tooltip) khác 0
              setTooltipState((prev) => ({ ...prev, opacity: 0 })); // đặt lại state của tooltipState
            return; // Không render ra tooltip
          }

          /*
            Logic để hiển thị tooltip bài hát khi người dùng di chuột vào một điểm point của một đường line nào đó trên biểu đồ
              - So sánh bằng counter do API cung cấp
                VD: counter của API trả về
                      - data: [8699, 5736, 3620, 4696, 9899, 12452, 9752, 10195, 10064, 10738, 8881, 8501] encodeId: "Z6AABFU6"
              - Lấy ra counter, encodeId của API trả về và lưu vào biến khi người dùng di chuột di chuột vào điểm point
              - Lấy ra counter, encodeId của điểm point mà người dùng đang di chuột vào hiện tại dựa vào counter lấy được từ API trả về
              - Set encodeId vào state
              - Tạo mới dữ liệu tooltipData dựa vào object tooltip 
              - Kiểm tra nếu dữ liệu tooltipData mới khác với tooltipState custom thì set lại tooltipState đó bằng dữ liệu tooltipData mới
          */

          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          // console.log(counters);

          // console.log(+tooltip.body[0]?.lines[0]?.replace(".", ""));
          const rs = counters.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(".", "")
            )
          );
          setSelected(rs.encodeId);
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      // cấu hình hành vi hover của biểu đồ:
      mode: "dataset", // đặt chế độ hover thành "dataset" trong đó mục gần nhất trên tất cả các dataset được tô sáng
      intersect: false, // chỉ định rằng tương tác hover sẽ chỉ kích hoạt khi trực tiếp trên một mục, thay vì giao nhau với mục đó.
    },
  };
  // console.log(selected);

  // useEffect được thực thi khi state data chart trong redux store thay đổi (dùng cho việc hiển thị biểu đồ)
  useEffect(() => {
    // nhãn chú thích nằm ngang (số giờ chẵn)
    const labels = chart?.times
      ?.filter((item) => item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);

    const datasets = []; // dữ liệu để vẽ lên biểu đồ trong thư viện react-chartjs-2
    if (chart?.items) {
      // Thực hiện 3 lần lặp (tạo ra 3 dữ liệu cho biểu đồ)
      for (let i = 0; i < 3; i++) {
        datasets.push({
          // Object.keys(chart?.items): lấy ra các key của 1 object và trả về dưới dạng 1 mảng

          // Object.keys(chart?.items)[i]: truy cập phần tử tại index trong mảng được trả về bởi Object.keys, chọn key tại lần lặp hiện tại của vòng lặp

          data: chart?.items[Object.keys(chart?.items)[i]]
            // do chart.items trả về 1 mảng có các object có key là Z6AABFU6, Z6BADFAZ, Z69AO98C và những key này có thể bị thay đổi theo tgian nên ở đây ta sử dụng bracket notation để xử lý hay truy cập vào những key động này
            ?.filter((item) => item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050", // đặt màu đường viền của từng datasets.
          tension: 0.2, // đặt độ căng của dòng của datasets
          borderWidth: 2, // đặt chiều rộng của các đường viền của datasets thành 2 pixel
          pointBackgroundColor: "white", // đặt màu nền của các điểm dữ liệu
          pointHoverRadius: 4, // chỉ định bán kính của các điểm dữ liệu khi được hover qua
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050", // đặt màu đường viền của các điểm dữ liệu
          pointHoverBorderWidth: 4, // chỉ định độ rộng đường viền của các điểm dữ liệu khi được hover qua
        });
      }
      setData({ labels, datasets });
    }
  }, [chart]);

  return (
    <div className="px-[59px] mt-12 relative min-[1324px]:max-h-[430px] h-[760px] rounded-md">
      <img
        src={bgChart}
        alt="bg-chart"
        className="w-full object-cover rounded-md max-h-[430px]"
      />
      <div className="absolute top-0 z-10 left-[59px] right-[59px] bottom-0 bg-[rgba(77,34,104,0.9)] rounded-md"></div>
      <div className="absolute top-0 z-20 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-8 rounded-md">
        <Link
          to={path.ZING_CHART}
          className="flex gap-2 items-center text-white hover:text-green-800"
        >
          <h3 className="text-2xl font-bold">#zingchart</h3>
          <span className="bg-white p-1 rounded-full">
            <BsFillPlayFill size={18} color="green" />
          </span>
        </Link>
        <div className="min-[1324px]:flex-row flex flex-col gap-4 h-full">
          <div className="flex-3 flex flex-col gap-4">
            {rank
              ?.filter((i, index) => index < 3)
              .map((item, index) => (
                <SongItem
                  key={item.encodeId}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  artists={item.artistsNames}
                  sid={item.encodeId}
                  order={index + 1}
                  percent={Math.round((+item.score * 100) / +chart?.totalScore)}
                  style="text-white bg-[hsla(0,0%,100%,0%) hover:bg-[#945ea7]"
                />
              ))}
            <Link
              to={path.ZING_CHART}
              className="text-white px-4 py-2 rounded-l-full rounded-r-full border m-auto border-white w-fit"
            >
              Xem thêm
            </Link>
          </div>
          <div className="flex-7 order-first min-[1324px]:order-last min-[1324px]:w-[500px] h-[80%] relative">
            {data && <Line data={data} ref={chartRef} options={options} />}
            <div
              className="tooltip"
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: "absolute",
              }}
            >
              <SongItem
                thumbnail={
                  rank?.find((i) => i.encodeId === selected)?.thumbnail
                }
                title={rank?.find((i) => i.encodeId === selected)?.title}
                artists={
                  rank?.find((i) => i.encodeId === selected)?.artistsNames
                }
                sid={rank?.find((i) => i.encodeId === selected)?.encodeId}
                style="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
