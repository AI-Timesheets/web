<template>
    <CContainer class="">
    <CRow class="w-100 justify-content-center">
      <CCol sm="8" md="6" style="margin-top: 5%">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <h1>Forgot your password?</h1>
            <p>Enter your email and we'll send you a recovery link.</p>
            <CInput
                placeholder="Email Address"
                autocomplete="email"
                v-model="email"
                v-bind:isValid="isValid"
              >
              <template #invalid-feedback><div class="invalid-feedback">{{error}}</div></template>
            </CInput>
            <p v-if="success">A recovery email has been sent!</p>
            <CButton color="success" v-on:click="recover" block>Send Recovery Email</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </CContainer>
</template>

<script>
export default {
  data: function() {
    return {
      email: "",
      error: null,
      success: false,
      isValid: null,
    }
  },
  methods: {
    recover: async function() {
      this.error = "";

      try {
        const response = await this.$http.post("backend-auth/recover", {email: this.email});
        this.success = true;
        this.isValid = true;
      } catch (e) {
        this.isValid = false;
        this.error = "Invalid Email Address";
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>