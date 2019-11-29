<template>
  <CContainer class="align-items-center min-vh-100">
    <CRow>
      <CCol lg="2"></CCol>
      <CCol lg="8" style="margin-top: 15%">
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                  v-model="usernameOrEmail"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  v-model="password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow v-if="error || status">
                  <CCol col="12" v-if="error">
                    <div class="alert alert-danger">{{error}}</div>
                  </CCol>
                  <CCol col="12" v-if="status">
                    <div class="alert alert-primary">{{status}}</div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol col="4">
                    <CButton color="primary" class="px-4" v-on:click="login">Login</CButton>
                  </CCol>
                  <CCol col="8" class="text-right">
                    <CButton color="link" class="px-0">Forgot password?</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-md-down-none"
            style="width:44%"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>Eliminate buddy punching. Allow your employees to scan their face to clock in.</p>
            <CButton
              color="primary"
              class="active mt-3"
            >
              Register Now!
            </CButton>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>

import {AuthMutations} from "../../store";

export default {
  name: 'Login',
  data: function() {
    return {
      usernameOrEmail: "",
      password: "",
      status: null,
      error: null,
    }
  },
  methods: {
    login: async function() {

      this.error = null;
      this.status = "Checking Credentials";

      try {
        const response = await this.$http.post("/backend-auth/login", {
          usernameOrEmail: this.usernameOrEmail,
          password: this.password,
        });

        this.status = "Success!";

        this.$store.commit(AuthMutations.SetToken, response.jwt);
        this.$store.commit(AuthMutations.SetUser, response.user);

        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      } catch (e) {
        this.status = null;
        this.error = e.message;

        setTimeout(() => {
          this.error = null;
        }, 2000);
      }
    }
  }
}
</script>
