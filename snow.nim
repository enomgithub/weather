import basic2d
import dom
import future
import math
from random import random, randomize

import HTML5_canvas as cvs


type Snow = object
  pt: Point2d
  size: float
  color: cstring


proc draw(ctx: CanvasRenderingContext2D, snow: ref Snow) =
  ctx.fillStyle = snow.color
  ctx.beginPath()
  ctx.arc(snow.pt.x, snow.pt.y, snow.size / 2.0, 0.0, math.PI * 2.0, true)
  ctx.fill()


proc move(snow: ref Snow, width: float, height: float) =
  const
    dvxMax: float = 3.0
    dvyMax: float = 5.0
  let
    dx: float = random(max=1.0) * dvxMax
    dy: float = random(max=1.0) * dvyMax
    m: Matrix2d = move(dx, dy)
  snow.pt &= m
  if snow.pt.x > width:
    snow.pt.x -= width
  if snow.pt.y > height:
    snow.pt.y -= height


proc loop(canvas: Canvas, snows: openArray[ref Snow]) =
  const bgcolor: cstring = "#0D0015"
  let ctx: CanvasRenderingContext2D = cvs.getContext2D(canvas)
  ctx.fillStyle = bgcolor
  ctx.fillRect(0.0, 0.0, canvas.width.toFloat, canvas.height.toFloat)
  for snow in snows:
    draw(ctx, snow)
  for snow in snows:
    move(snow, canvas.width.toFloat, canvas.height.toFloat)


proc makeSnow(n: int, width: float, height: float): seq[ref Snow] =
  const
    sizeMax: float = 22.0
  var snows: seq[ref Snow]
  for i in countup(0, n - 1):
    let snow = Snow.new
    snow.pt = basic2d.point2d(random(max=width), random(max=height))
    snow.size = random(max=1.0) * sizeMax
    snow.color =
      if snow.size < 5.0: "#A0A0A0"
      elif snow.size < 10.0: "#C0C0C0"
      elif snow.size < 15.0: "#E0E0E0"
      else: "#FFFFFF"
    snows.safeAdd(snow)
  return snows


proc quickSort(snows: seq[ref Snow]): seq[ref Snow] =
  case snows.len
  of 0: return @[]
  of 1: return snows
  else:
    let
      smallOrEqual: seq[ref Snow] =
        lc[ snow | ( snow <- snows
                   , snow.size <= snows[0].size
                   , snow != snows[0]
                   )
                   , ref Snow
          ]
      large: seq[ref Snow] =
        lc[ snow | (snow <- snows
                   , snow.size > snows[0].size
                   , snow != snows[0]
                   )
                   , ref Snow
          ]
    return quickSort(smallOrEqual) & snows[0] & quickSort(large)


proc main() =
  const
    ID: cstring = "snow"
    WIDTH: int = 1000
    HEIGHT: int = 500
    N: int = 100
    MS: int = 16
  randomize()
  var snows: seq[ref Snow] = makeSnow(N, WIDTH.toFloat, HEIGHT.toFloat)
  snows = snows.quickSort()
  let canvas: Canvas = Canvas(document.getElementById(ID))
  canvas.width = WIDTH
  canvas.height = HEIGHT
  var timer: ref TInterval =
    setInterval( window
               , proc() = loop(canvas, snows)
               , MS
               )


when isMainModule:
  main()
