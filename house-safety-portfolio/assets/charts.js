(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: Module Page Distribution ---
  var chart1 = echarts.init(document.getElementById('chart-module-dist'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: 140, right: 40, top: 20, bottom: 30 },
    xAxis: { type: 'value', axisLabel: { color: muted }, axisLine: { lineStyle: { color: rule } }, splitLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'category', data: ['房屋档案', '巡检管理', '体检管理', '安全鉴定', '隐患管理', '整治管理', '销号管理', '装修备案', '计划管理', '企业管理', '设备监控', '其他'], axisLabel: { color: ink }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'bar',
      data: [25, 10, 7, 10, 5, 7, 4, 5, 5, 8, 4, 20],
      itemStyle: { color: accent, borderRadius: [0, 4, 4, 0] },
      label: { show: true, position: 'right', color: muted, fontSize: 12 }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart: Business Flow Gantt ---
  var chart2 = echarts.init(document.getElementById('chart-flow'), null, { renderer: 'svg' });
  var stages = ['信息入库', '日常巡检', '房屋体检', '安全鉴定', '隐患发现', '整治执行', '销号审核'];
  var startDates = ['2025-10', '2025-10', '2025-11', '2025-11', '2025-11', '2025-12', '2025-12'];
  var endDates = ['2025-10', '2025-12', '2026-01', '2026-01', '2026-01', '2026-02', '2026-03'];
  var data = stages.map(function(s, i) {
    return { name: s, value: [i, new Date(startDates[i]).getTime(), new Date(endDates[i]).getTime()] };
  });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: function(p) { return p.name; } },
    grid: { left: 100, right: 30, top: 20, bottom: 20 },
    xAxis: { type: 'time', axisLabel: { color: muted, rotate: 0 }, axisLine: { lineStyle: { color: rule } }, splitLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'category', data: stages, axisLabel: { color: ink }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'custom',
      renderItem: function(params, api) {
        var catIndex = api.value(0);
        var start = api.coord([api.value(1), catIndex]);
        var end = api.coord([api.value(2), catIndex]);
        var height = api.size([0, 1])[1] * 0.6;
        return {
          type: 'rect',
          shape: { x: start[0], y: start[1] - height / 2, width: end[0] - start[0], height: height },
          style: { fill: catIndex < 3 ? accent : accent2, rx: 4, ry: 4 }
        };
      },
      data: data,
      encode: { x: [1, 2], y: 0 }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });
})();