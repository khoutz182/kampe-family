<template>
  <b-container>
    <slot/>
  </b-container>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
@import "~bootstrap/scss/bootstrap-reboot";
@import "~bootstrap/scss/bootstrap-grid";

@import "~bootstrap/scss/close";

@import "~bootstrap/scss/modal";
@import "~bootstrap-vue/src/components/modal/modal";
</style>

<script>
import { BContainer } from 'bootstrap-vue'
export default {
  components: {
    'b-container': BContainer
  }

}
</script>
