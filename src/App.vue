<template>
  <div id="app">
    <ResponsiveScrollableGrid/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ResponsiveScrollableGrid from './components/ResponsiveScrollableGrid.vue';

@Component({
  components: {
    ResponsiveScrollableGrid,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
