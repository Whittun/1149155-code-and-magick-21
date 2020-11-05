'use strict';
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = 150;
const BAR_GAP = 50;
const TEXT_GAP = 20;
const GAP = 10;

var renderRectangle = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderRectangle(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)', CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили! ', CLOUD_X + GAP + TEXT_GAP, TEXT_GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + TEXT_GAP, TEXT_GAP * 3);

  var maxTimes = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTimes) {
      maxTimes = times[i];
    }
  }

  for (var j = 0; j < names.length; j++) {
    var barColor;
    var barHeight = (BAR_MAX_HEIGHT * times[j] / maxTimes);
    var barY = CLOUD_HEIGHT - GAP - TEXT_GAP - barHeight;
    var barX = CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * [j];

    if (names[j] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    } else {
      barColor = 'hsl(238, 66%, ' + (Math.random() * 100) + '%)';
    }

    renderRectangle(ctx, barX, barY, barColor, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';

    ctx.fillText(Math.floor(times[i]), barX, barY - GAP);
    ctx.fillText(names[i], barX, CLOUD_HEIGHT - GAP);
  }
};

