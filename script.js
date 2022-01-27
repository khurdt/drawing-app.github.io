let drawingApp = (function() {

let colors = [
    {
      name: 'black',
      hex: '#000000'
    },
    {
      name: 'white',
      hex: '#FFFFFF'
    },
    {
      name: 'dark purple',
      hex: '#351c75'
    },
    {
      name: 'pink',
      hex: '#ed76d9'
    },
    {
      name: 'grey',
      hex: '#b4bbc4'
    },
    {
      name: 'brown',
      hex: '#552410'
    },
    {
      name: 'brown',
      hex: '#00423c'
    },
    {
      name: 'dark red',
      hex: '#800000'
    },
    {
      name: 'red',
      hex: '#FF0000'
    },
    {
      name: 'blue',
      hex: '#0000ff'
    },
    {
      name: 'yellow',
      hex: '#ffff00'
    },
    {
      name: 'green',
      hex: '#41bc08'
    },
    {
      name: 'orange',
      hex: '#ff5e05'
    },
    {
      name: 'purple',
      hex: '#8305ff'
    },
    {
      name: 'turquoise',
      hex: '#05e8ff'
    }
  ]

  function loadColors() {
    colors.forEach(function (item) {
      let color = {
        name: item.name,
        hex: item.hex
      }
    });
  }

  function displayColors(color) {
    let container = document.querySelector('.colors');
    let listColor = document.createElement('li');
    let button = document.createElement('button');
    listColor.classList.add('list-item');
    button.classList.add('button');
    button.style.backgroundColor = color.hex;
    button.innerText = color.name.toLowerCase();
    listColor.appendChild(button);
    container.appendChild(listColor);

    button.addEventListener('click', () => {
      currentColor = color.hex;
      console.log(color.hex);
    })
  }

  //----------Canvas-----------------------------------------------------------------------------------

  const canvas = document.querySelector('#canvas'),
    changeView_uiElement = document.querySelector('#changeView'),
    changeLineWidth_uiElement = document.querySelector('#changeLineWidth'),
    ctx = canvas.getContext('2d');

  let currentColor = undefined,
    currentLineWidth = changeLineWidth_uiElement.value,
    currentView = changeView_uiElement.value,
    isDrawing = false;

  let previousCoords = [{x: null, y: null}];

  captureCanvasDimensions();

  function handleStart() {
    isDrawing = true;
  }

  function handleEnd() {
    isDrawing = false;
    previousCoords.forEach( item => {
      item.x = null;
      item.y = null;
    })
  }

  function handleMove(e) {
    if (!isDrawing) {
      return;
    }

    let x = e.pageX;
    let y = e.pageY;

    draw(x, y);

  }

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
  }

  function captureCanvasDimensions() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    handleClearCanvas();
  }

  function handleClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handlechangeLineWidth() {
    currentLineWidth = changeLineWidth_uiElement.value;
  }

  function establishView() {
    currentView = changeView_uiElement.value;

    if (currentView === 'normal') {
      previousCoords = [{x: null, y: null}]
    } else if (currentView === 'mirror') {
      previousCoords = [{x: null, y: null}, {x: null, y: null}]
    } else if (currentView === 'quadrants') {
      previousCoords = [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}];
    }
  }

  changeView_uiElement.addEventListener('change', establishView);
  changeLineWidth_uiElement.addEventListener('change', handlechangeLineWidth);
  canvas.addEventListener('pointerdown', handleStart);
  canvas.addEventListener('pointerup', handleEnd);
  canvas.addEventListener('pointercancel', handleEnd);
  canvas.addEventListener('pointermove', handleMove);
  canvas.addEventListener('resize', captureCanvasDimensions);
  document.querySelector('#clearCanvas').addEventListener('click', handleClearCanvas);

  //---------------Menu button--------------------------------------------------------------------

  const menu = document.querySelector("#control-container"),
    menuItems = document.querySelectorAll(".control-item"),
    hamburger= document.querySelector(".hamburger"),
    closeIcon= document.querySelector(".close-icon"),
    menuIcon = document.querySelector(".menu-icon"),
    clearC = document.querySelector('#clearCanvas');

  function toggleMenu() {
    if (menu.classList.contains("display")) {
      menu.classList.remove("display");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      menu.classList.add("display");
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
    }
  }
   hamburger.addEventListener("click", toggleMenu);
   clearC.addEventListener('click', toggleMenu);
   
  //-----------------------------------------------------------------------------------------------

  function getAll() {
    return colors;
  }

  return {
    getAll: getAll,
    loadColors: loadColors,
    displayColors: displayColors
  }
})();

  drawingApp.getAll().forEach(function(color) {
    drawingApp.loadColors(color);
    drawingApp.displayColors(color);
    console.log(color);
  });

