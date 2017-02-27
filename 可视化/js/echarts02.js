// 初始化echarts实例
var myChart = echarts.init(document.getElementById("main"));

// 指定图表的配置项和数据
var option = {
  title: {
    text: "北京市2017年2月上旬天气情况",
    textStyle: {
      fontFamily: "微软雅黑",
      fontSize: 30
    },
    subtext: "数据来源",
    sublink: "http://tianqi.2345.com/wea_history/54511.htm",
    subtextStyle: {
      fontSize: 16,
      color: "#666"
    },
    itemGap: 14
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  legend: {
    data: ["最高气温", "最低气温", "空气质量指数"],
    top: 30,
    right: 60,
    padding: [10, 20],
    itemGap: 50,
    itemWidth: 40,
    itemHeight: 20,
    backgroundColor: "#eee"
  },
  grid: {
    top: "20%",
  },
  xAxis: [
    {
      type: "category",
      name: "日期",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 24
      },
      nameGap: 36,
      data: ["2月1日", "2月2日", "2月3日",
        {
          value: "2月4日",
          textStyle: {
            fontSize: 18,
            color: "red"
          }
        }, "2月5日", "2月6日", "2月7日", "2月8日", "2月9日", "2月10日"],
      axisLine: {
        onZero: false,
        lineStyle: {
          width: 5
        }
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        margin: 16
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "温度/摄氏度",
      nameTextStyle: {
        color: "#000",
        fontSize: 20
      },
      min: -10,
      max: 10,
      axisLabel: {
        formatter: "{value} ℃"
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
          width: 5
        }
      },
      axisLabel: {
        margin: 16,
        textStyle: {
          fontSize: 24,
          color: "#000"
        }
      },
      splitLine: {
        lineStyle: {
          color: "#fff",
          width: 5
        }
      }
    },
    {
      type: "value",
      name: "空气质量指数",
      nameTextStyle: {
        color: "#000",
        fontSize: 20
      },
      min: 0,
      max: 360,
      interval: 90,
      axisLabel: {
        formatter: "{value}"
      },
      splitLine: {
        lineStyle: {
          color: "#fff",
          width: 5
        }
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
          width: 5
        }
      },
      axisLabel: {
        margin: 16,
        textStyle: {
          fontSize: 24,
          color: "#000"
        }
      },
    }
  ],
  series: [
    {
      name: "最高气温",
      type: "line",
      areaStyle: {
        normal: {
        opacity: 0.2
      } },
      smooth: true,
      data: [4, 5, 6, 9, 8, 4, 1, 4, 3, 4]
    },
    {
      name: "最低气温",
      type: "line",
      areaStyle: {
        normal: {
        opacity:0.4
      } },
      smooth: true,
      data: [-7, -5, -3, -2, -4, -5, -4, -7, -5, -6]
    },
    {
      name: "空气质量指数",
      type: "bar",
      barWidth: "30%",
      yAxisIndex: 1,
      data: [45, 109, 188, 303, 28, 29, 99, 64, 28, 30]
    }
  ],
  backgroundColor: "#cddee7",
  color: ['#f00','#30f', '#3f0', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
}

myChart.setOption(option);
