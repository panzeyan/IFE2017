// 初始化echarts实例
var myChart = echarts.init(document.getElementById("main"));

// 指定图表的配置项和数据
var option = {
  title: {
    text: "北京2017年2月上旬天气情况"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data:["最高气温", "最低气温", "空气质量指数"]
  },
  xAxis: [
    {
      type: "category",
      data: ["2月1日", "2月2日", "2月3日", "2月4日", "2月5日", "2月6日", "2月7日", "2月8日", "2月9日", "2月10日"],
      axisLine: {
        onZero: false
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "温度",
      min: -10,
      max: 10,
      axisLabel: {
        formatter: "{value} ℃"
      }
    },
    {
      type: "value",
      name: "空气质量指数",
      min: 0,
      // max: 350,
      axisLabel: {
        formatter: "{value}"
      }
    }
  ],
  series: [
    {
      name: "最高气温",
      type: "line",
      data: [4, 5, 6, 9, 8, 4, 1, 4, 3, 4]
    },
    {
      name: "最低气温",
      type: "line",
      data: [-7, -5, -3, -2, -4, -5, -4, -7, -5, -6]
    },
    {
      name: "空气质量指数",
      type: "bar",
      yAxisIndex: 1,
      data: [45, 109, 188, 303, 28, 29, 99, 64, 28, 30]
    }
  ]
}

myChart.setOption(option);
