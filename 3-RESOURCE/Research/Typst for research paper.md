```Typst
= Introduction

+ The climate
  - Temperature
  - Precipitation
+ The topography
+ The geology
```

- Image: 
```Typst
Glaciers as the one shown in
@glaciers will cease to exist if
we don't take action soon!

#figure(
  image("glacier.jpg", width: 70%),
  caption: [
    _Glaciers_ form an important part
    of the earth's climate system.
  ],
) <glaciers>
```

- Bibliography
```Typst
= Methods
We follow the glacier melting models
established in @glacier-melt.

#bibliography("works.bib")
```
