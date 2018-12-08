var c = document.getElementById("canv"),
    p = c.getContext("2d"),
    col = function (t, n, o, r, c) {
      p.fillStyle = "rgb(" + o + "," + r + "," + c + ")",
        p.fillRect(t, n, 1, 1)
    },
    R = function (t, n, o) {
      return Math.floor(10 + 40 * Math.cos((t * t - n * n) / 300 + o));
    },
    G = function (t, n, o) {
      return Math.floor(10 + 40 * Math.sin((t * t * Math.cos(o / 4) + n * n * Math.sin(o / 3)) / 300));
    },
    B = function (t, n, o) {
      return Math.floor(10 + 40 * Math.sin(5 * Math.sin(o / 9) + ((t - 100) * (t - 100) + (n - 100) * (n - 100)) / 1100));
    },
    t = 0,
    run = function () {
      var x, y;
      for (x = 0; x <= 35; x++) {
        for (y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t += 0.005, window.requestAnimationFrame(run)
    };
  run();