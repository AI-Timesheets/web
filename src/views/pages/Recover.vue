<template>
    <CContainer class="">
    <CRow class="w-100 justify-content-center">
      <CCol sm="8" md="8" lg="6" style="margin-top: 5%">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <h1>Recover Account</h1>
            <p>Please enter a new password</p>
            <CInput
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                v-model="password"
              >
            </CInput>
            <CRow v-if="status">
                <CCol col="12">
                  <div col="12" class="alert alert-primary">{{status}}</div>
                </CCol>
              </CRow>
              <CRow v-if="error">
                <CCol col="12">
                  <div col="12" class="alert alert-danger">{{error}}</div>
                </CCol>
              </CRow>
            <CButton color="primary" v-on:click="submit" block>Submit</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </CContainer>
</template>

<script>

import {isFormException} from "../../exceptions/exceptionCheck";

export default {
  data: function() {
    return {
      password: "",
      error: null,
      status: null,
    }
  },
  methods: {
    submit: async function() {
      this.error = null;
      this.status = null;
      try {
        const response = await this.$http.post('backend-auth/change-password-recovery', {
          password: this.password,
          recoveryKey: this.$route.params.key
        });

        this.status = "Password changed successfully";
        setTimeout(() => {
          this.$router.push({name: "Login"});
        }, 1000);
      } catch (e) {
        console.log(e);
        if (isFormException(e)) {
          this.error = "Invalid Password";
        } else {
          this.error = e.data;
        }
      }
    }
  }
}
</script>