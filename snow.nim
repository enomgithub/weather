import dom
import basic2d
import math
from random import random, randomize

import HTML5_canvas as cvs


const
  nMin: int = 0
  nMax: int = 99
  width: int = 1000
  height: int = 500
  sizeMax: float = 22.0
  dvxMax: float = 3.0
  dvyMax: float = 5.0
  ms: int = 16
  id: cstring = "snow"
  color: cstring = "#ffffff"
  bgcolor: cstring = "#000000"


type Snow = object
  pt: Point2d
  size: float
  color: cstring


proc draw(ctx: CanvasRenderingContext2D, snow: ref Snow) =
  ctx.beginPath()
  ctx.arc(snow.pt.x, snow.pt.y, snow.size / 2.0, 0.0, math.PI * 2.0, true)
  ctx.fill()


proc move(snow: ref Snow) =
  let
    dx: float = random(max=1.0) * dvxMax
    dy: float = random(max=1.0) * dvyMax
    m: Matrix2d = move(dx, dy)
  snow.pt &= m
  if snow.pt.x > width.toFloat:
    snow.pt.x -= width.toFloat
  if snow.pt.y > height.toFloat:
    snow.pt.y -= height.toFloat


proc loop(ctx: CanvasRenderingContext2D, snows: array[nMin..nMax, ref Snow]) =
  ctx.fillStyle = bgcolor
  ctx.fillRect(0.0, 0.0, width.toFloat, height.toFloat)
  ctx.fillStyle = color
  for snow in snows:
    draw(ctx, snow)
  for snow in snows:
    move(snow)


proc makeSnow(): array[nMin..nMax, ref Snow] =
  var snows: array[nMin..nMax, ref Snow]
  for i in countup(nMin, nMax):
    let snow = Snow.new
    snow.pt = basic2d.point2d(random(max=width.toFloat),
                              random(max=height.toFloat))
    snow.size = random(max=1.0) * sizeMax
    snow.color = color
    snows[i] = snow
  return snows


proc main() =
  randomize()
  var snows: array[nMin..nMax, ref Snow] = makeSnow()
  var canvas: Canvas = Canvas(document.getElementById(id))
  canvas.width = width
  canvas.height = height
  var ctx: CanvasRenderingContext2D = cvs.getContext2D(canvas)
  var timer: ref TInterval = setInterval(window,
                                         proc() = loop(ctx, snows),
                                         ms)


when isMainModule:
  main()
