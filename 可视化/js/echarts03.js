$.get('map/world_map.json', function (worldMap) {
  echarts.registerMap('worldMap', worldMap);
  var chart = echarts.init(document.getElementById('main'));
  chart.setOption({
    series: [{
      type: 'map',
      map: 'worldMap'
    }]
  });
});
