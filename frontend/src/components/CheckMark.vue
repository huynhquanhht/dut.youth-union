<template>
<div class="check-mark-wrapper">
  <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
      <path class="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
      <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
    </g>
  </svg>
</div>
</template>

<script>
export default {
  name: "CheckMark"
}
</script>

<style lang="scss" scoped>
$size: 160px;
$color: #7fd438;
svg {
  display: block;
  height: $size;
  width: $size;
  color: $color; /* SVG path use currentColor to inherit this */
}

.circle {
  stroke-dasharray: 76;
  stroke-dashoffset: 76;
  animation: draw 1s forwards;
}

.tick {
  stroke-dasharray: 18;
  stroke-dashoffset: 18;
  animation: draw 1s forwards 1s;
}

@keyframes draw {
  to { stroke-dashoffset: 0 }
}

/* For styling demo, not required */

body {
  background-color: #64DFDF;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
}
</style>