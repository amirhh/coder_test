let c = document.getElementById("canv");
let p = c.getContext("2d");
const col = (t, n, o, r, c) => {
  p.fillStyle = "rgb(" + o + "," + r + "," + c + ")";
  p.fillRect(t, n, 1, 1);
};
const R = (t, n, o) => {
  return Math.floor(10 + 40 * Math.cos((t * t - n * n) / 300 + o));
};
const G = (t, n, o) => {
  return Math.floor(10 + 40 * Math.sin((t * t * Math.cos(o / 4) + n * n * Math.sin(o / 3)) / 300));
};
const B = (t, n, o) => {
  return Math.floor(10 + 40 * Math.sin(5 * Math.sin(o / 9) + ((t - 100) * (t - 100) + (n - 100) * (n - 100)) / 1100));
};
let t = 0;
const run = () => {
  let x, y;
  for (x = 0; x <= 35; x++) {
    for (y = 0; y <= 35; y++) {
      col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
    }
  }
  t += 0.005;
  window.requestAnimationFrame(run);
};
run();