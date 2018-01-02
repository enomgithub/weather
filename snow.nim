import basic2d
import dom
import future
import math
import random

import HTML5_canvas as cvs


type Snow = object
  pt: Point2d
  size: float
  color: cstring


proc draw(ctx: CanvasRenderingContext2D, snow: ref Snow) =
  const twoPi: float = math.PI * 2.0
  ctx.fillStyle = snow.color
  ctx.beginPath()
  ctx.arc(snow.pt.x, snow.pt.y, snow.size / 2.0, 0.0, twoPi, true)
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
  if snow.pt.x > width: snow.pt.x -= width
  if snow.pt.y > height: snow.pt.y -= height


proc cls(ctx: CanvasRenderingContext2D, width: float, height: float) =
  const bgcolor: cstring = "#0D0015"
  ctx.fillStyle = bgcolor
  ctx.fillRect(0.0, 0.0, width, height)


proc loop(canvas: Canvas, snows: seq[ref Snow]) =
  let
    width: float = canvas.width.toFloat
    height: float = canvas.height.toFloat
    ctx: CanvasRenderingContext2D = cvs.getContext2D(canvas)
  ctx.cls(width, height)
  for snow in snows:
    draw(ctx, snow)
    move(snow, width, height)


proc makeSnow(n: int, width: float, height: float): seq[ref Snow] =
  randomize()
  const sizeMax: float = 22.0
  var snows: seq[ref Snow] = newSeq[ref Snow](n)
  for i in countup(0, n - 1):
    let
      size: float = random(max=1.0) * sizeMax
      snow: ref Snow = Snow.new
    snow.pt = basic2d.point2d(random(max=width), random(max=height))
    snow.size = size
    snow.color =
      if size < 5.0: "#A0A0A0"
      elif size < 10.0: "#C0C0C0"
      elif size < 15.0: "#E0E0E0"
      else: "#FFFFFF"
    snows[i] = snow
  return snows


proc quicksort(snows: seq[ref Snow]): seq[ref Snow] =
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
        lc[ snow | ( snow <- snows
                   , snow.size > snows[0].size
                   , snow != snows[0]
                   )
                   , ref Snow
          ]
    return quicksort(smallOrEqual) & snows[0] & quicksort(large)


proc median3[T: SomeNumber](x, y, z: T): T =
  if x < y:
    if y < z: return y
    elif z < x: return x
    else: return z
  else:
    if z < y: return y
    elif x < z: return x
    else: return z


proc quicksort2(list: var seq[ref Snow], left: int, right: int) =
  let diff: int = right - left
  if diff <= 0: return
  elif diff == 1:
    if list[left].size <= list[right].size: return
    else:
      swap(list[left], list[right])
      return
  else:
    var
      i: int = left
      j: int = right
      pivot: float = median3(list[i].size, list[i + ((j - i) div 2)].size, list[j].size)
    while true:
      while list[i].size < pivot: i += 1
      while pivot < list[j].size: j -= 1
      if i >= j: break
      else:
        swap(list[i], list[j])
        i += 1
        j -= 1
    quicksort2(list, left, i - 1)
    quicksort2(list, j + 1, right)


proc main() =
  const
    ID: cstring = "snow"
    WIDTH: int = 1000
    HEIGHT: int = 500
    FWIDTH: float = WIDTH.toFloat
    FHEIGHT: float = HEIGHT.toFloat
    N: int = 100
    MS: int = 16
  var snows: seq[ref Snow] = makeSnow(N, FWIDTH, FHEIGHT)
  snows.quicksort2(low(snows), high(snows))
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
