<template>
  <router-view v-if="!loading || initialized"></router-view>
</template>

<script>

  import {store, AuthMutations} from './store';

  const IGNORE_ROUTES = [
    'Login',
    'Register',
    'Verify',
    'Recover',
    'ForgotPassword',
  ];

  export default {
    name: 'App',
    data: function() {
      return {
        loading: true,
        initialized: true,
      }
    },
    methods: {
      authorized: async function() {
        this.loading = true;
        try {
          const self = await this.$http.get("backend-auth/self");
          this.loading = false;
          store.commit(AuthMutations.SetUser, self);
          this.initialized = true;
          return true;
        } catch (e) {
          this.loading = false;
          if (IGNORE_ROUTES.indexOf(this.$route.name) !== -1) {
            return true;
          }
        }
        return false;
      }
    },
    mounted: async function() {

      document.title = "HeadCount"

      this.$router.afterEach((to, from) => {
        this.authorized()
          .then((authorized) => {
            if (!authorized && this.$route.name !== "Login") {
              this.$router.push({name: "Login"});
            }
          })
      });

      if (!await this.authorized()) {
        this.$router.push({name: "Login"});
      }

    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
