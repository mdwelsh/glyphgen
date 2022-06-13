#!/usr/bin/env python3

import svgwrite

dwg = svgwrite.Drawing('test.svg', profile='tiny')
dwg.add(dwg.line((100, 100), (500, 500), stroke=svgwrite.rgb(10, 10, 16, '%')))
dwg.add(dwg.text('Test', insert=(200, 200), fill='red'))
dwg.save()