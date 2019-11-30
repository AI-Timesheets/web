<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        {{name}}
      </CHeaderNavLink>
    </template>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="ml-auto"></CBadge>
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem v-on:click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>

import {AuthMutations} from "../store";

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {

    }
  },
  methods: {
    logout: function() {
      this.$store.commit(AuthMutations.SetUser, null);
      this.$store.commit(AuthMutations.SetToken, null);
      this.$router.push("login");
    }
  },
  computed: {
    user: function() {
      return this.$store.getters["user"];
    },
    name: function() {

      if (!this.user) {
        return "";
      }

      const firstName = this.user.first_name.charAt(0).toUpperCase() + this.user.first_name.slice(1);
      const lastName = this.user.last_name.charAt(0).toUpperCase() + this.user.last_name.slice(1);
      return firstName + " " + lastName;
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
