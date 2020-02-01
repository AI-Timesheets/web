<template>
  <div>
    <center v-if="!initialized"><CSpinner color="primary" size="lg" style="width:4rem; height:4rem; margin-top: 10%"></CSpinner></center>
    <router-view v-if="!loading || initialized"/>
  </div>
</template>

<script>

  import {store, AuthMutations, CompanyMutations} from './store';

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
        initialized: false,
      }
    },
    methods: {
      authorize: async function() {
        this.loading = true;
        try {
          const self = await this.$http.get("backend-auth/self");

          store.commit(AuthMutations.SetUser, self);

          try {

            const company = await this.$http.get("company/initial");

            store.commit(CompanyMutations.SetCompany, company);

            this.loading = false;

            if (IGNORE_ROUTES.indexOf(this.$route.name) !== -1) {
              this.$router.push({name: "Dashboard"});
            }

          } catch (e) {
            this.$router.push({name: "CreateInitialCompany"});
          }

        } catch (e) {
          this.loading = false;

          if (IGNORE_ROUTES.indexOf(this.$route.name) === -1) {
            this.$router.push({name: "Login"});
          }
        }

      }
    },
    mounted: async function() {

      this.$router.afterEach(async (to, from) => {
        await this.authorize()
        console.log(to, from);
        this.initialized = true;
      });

      await this.authorize()
    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
