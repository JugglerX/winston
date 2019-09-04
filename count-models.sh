#!/usr/bin/env bash

themes=(altitude archetype atmosphere azimuth big-picture cascade exponent exto hologram hyperbolic hypothesis landscape libris magnetic optics perception spectral telemetry universal ampersand fjord fresh vanilla construct fractal hyperspace phantom reflex)
ssgs=(jekyll hugo gatsby)

echo "theme,jekyll,hugo,gatsby"

for theme in "${themes[@]}"
do
  res=$theme
  for ssg in "${ssgs[@]}"
  do
    count=$(./scripts/convert.js $theme $ssg contentful --cms-dry-run 2> /dev/null | sed -n 's/number of content types: \([0-9]*\)/\1/p')
    res+=",$count"
  done
  echo $res
done
