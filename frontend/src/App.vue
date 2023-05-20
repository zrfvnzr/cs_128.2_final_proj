<script>
</script>

<template>
  <div style="display: flex; flex: 1; flex-direction: column;">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  --apple: #5BB95A;
  --rich-electric-blue: #00A0DC;
}
.hoverTransform {
  transition: transform .1s linear;
}
.hoverTransform:hover {
  transform: scale(.95);
}
.h-1-rem {
  height: 1rem;
}
/* font colors */
.fc-apple {
  color: var(--apple);
}
/* end font colors */
/* font sizes */
.fs-7 {
  font-size: .9rem;
}
.fs-8 {
  font-size: .8rem;
}
.fs-9 {
  font-size: .7rem;
}
.fs-10 {
  font-size: .6rem;
}
/* end font sizes */
</style>
