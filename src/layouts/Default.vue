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
main.container {
  flex: 1;
}
</style>
