<template>
  <router-view></router-view>
</template>

<script>

  import {store, AuthMutations} from './store';

  export default {
    name: 'App',
    mounted: async function() {
      try {
        const self = await this.$http.get("backend-auth/self");
        //store.commit(AuthMutations.SetUser, self);
        console.log(store.getters["user"]);
      } catch (e) {
        console.log(e);
        if (this.$route.path !== "/login") {
          this.$router.push("/login");
        }
      }
    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
