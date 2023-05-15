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
</style>
