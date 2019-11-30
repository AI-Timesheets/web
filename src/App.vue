<template>
  <router-view v-if="!loading"></router-view>
</template>

<script>

  import {store, AuthMutations} from './store';

  export default {
    name: 'App',
    data: function() {
      return {
        loading: true,
      }
    },
    methods: {

    },
    mounted: async function() {
      try {
        const self = await this.$http.get("backend-auth/self");
        this.loading = false;
        store.commit(AuthMutations.SetUser, self);
      } catch (e) {
        this.loading = false;
        if (this.$route.path !== "/login" && this.$route.path !== '/register') {
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
