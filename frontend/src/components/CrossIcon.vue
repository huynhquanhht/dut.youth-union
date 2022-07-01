<template>
  <div class="cross-icon-wrapper">
    <svg class="cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="cross__circle" cx="26" cy="26" r="25" fill="none"/>
      <path class="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
      <path class="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "CrossIcon"
}
</script>

<style lang="scss" scoped>
.cross-icon-wrapper {
  $color: #e55454;
.cross__svg {
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  height: 160px;
  width: 160px;
}

.cross__circle {
  animation: 0.6s ease 0s normal forwards 1 running stroke;
  fill: none;
  margin: 0 auto;
  stroke: $color;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
}

.cross__path {
  stroke: $color;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  transform-origin: 50% 50% 0;
&--right {
   animation: 0.3s ease 0.8s normal forwards 1 running stroke;
 }
&--left {
   animation: 1s ease 0.8s normal forwards 1 running stroke;
 }
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
}
</style>