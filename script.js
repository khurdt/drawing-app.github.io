(function() {
  const canvas = document.querySelector('#canvas'),
        changeView_uiElement = document.querySelector('#changeView'),
        changeLineWidth_uiElement = document.querySelector('#changeLineWidth'),
        changeColor_uiElement = document.querySelector('#changeColors'),
        ctx = canvas.getContext('2d');

  let currentColor = changeColor_uiElement.value,
      currentLineWidth = changeLineWidth_uiElement.value,
      currentView = changeView_uiElement.value,
      isDrawing = false;

  let previousCoords = [{x: null, y: null}];

  captureCanvasDimensions();

  function handleStart(e) {
    isDrawing = true;
  };

  function handleEnd() {
    isDrawing = false;
    previousCoords.forEach( item => {
      item.x = null;
      item.y = null;
    })
  };

  function handleMove(e) {
    if (!isDrawing) {
      return;
    }
    
    // const top = +window.getComputedStyle(canvas).getPropertyValue('top').slice(0, -2),
    //       left = +window.getComputedStyle(canvas).getPropertyValue('left').slice(0, -2),
    let x = e.pageX - 10;
    let y = e.pageY - 60;

          draw(x, y);

  };

  function draw(x, y) {

    const { width, height } = canvas;

    let newX, newY;

    previousCoords.forEach((coords, i) => {

      if (i === 0) {
        newX = x;
        newY = y;
      }else if (i === 1) {
        newX = width - x;
        newY = y;
      }else if (i === 2) {
        newX = width - x;
        newY = height - y;
      }else {
        newX = x;
        newY = height - y;
      }

      if (!coords.x) {
        coords.x = newX;
        coords.y = newY;
      }

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(newX, newY);

      ctx.lineWidth = currentLineWidth;
      ctx.strokeStyle = currentColor;
      ctx.stroke();

      coords.x = newX;
      coords.y = newY;

    })
  };

  function captureCanvasDimensions() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    handleClearCanvas();
  };

  function handleClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  function handleChangeColor() {
    currentColor = changeColor_uiElement.value;
  };

  function handlechangeLineWidth() {
    currentLineWidth = changeLineWidth_uiElement.value;
  };

  function establishView() {
    currentView = changeView_uiElement.value;

    if (currentView === 'normal') {
      previousCoords = [{x: null, y: null}]
    } else if (currentView === 'mirror') {
      previousCoords = [{x: null, y: null}, {x: null, y: null}]
    } else if (currentView === 'quadrants') {
      previousCoords = [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}];
    }
    handleClearCanvas();
  };

  changeView_uiElement.addEventListener('change', establishView);
  changeLineWidth_uiElement.addEventListener('change', handlechangeLineWidth);
  changeColor_uiElement.addEventListener('change', handleChangeColor);
  canvas.addEventListener("pointerdown", handleStart);
  canvas.addEventListener("pointerup", handleEnd);
  canvas.addEventListener("pointercancel", handleEnd);
  canvas.addEventListener("pointermove", handleMove);
  canvas.addEventListener("resize", captureCanvasDimensions);
  document.querySelector('#clearCanvas').addEventListener('click', handleClearCanvas);
})();
