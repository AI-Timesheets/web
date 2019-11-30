<template>
  <CContainer class="">
    <CRow class="w-100 justify-content-center">
      <CCol sm="8" md="6" style="margin-top: 5%">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <CForm>
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <CInput
                      placeholder="First Name"
                      autocomplete="firstname"
                      v-bind:isValid="isValidField('firstName')"
                      v-model="user.firstName"
                      v-on:input="validateFields"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('firstName')}}</div></template>
              </CInput>
              <CInput
                      placeholder="Last Name"
                      autocomplete="lastname"
                      v-model="user.lastName"
                      v-bind:isValid="isValidField('lastName')"
                      v-on:input="validateFields"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('lastName')}}</div></template>
              </CInput>
              <CInput
                placeholder="Username"
                autocomplete="username"
                v-model="user.username"
                v-bind:isValid="isValidField('username')"
                v-on:input="validateFields"
              >
              <template #invalid-feedback><div class="invalid-feedback">{{fieldError('username')}}</div></template>
              </CInput>
              <CInput
                placeholder="Email"
                autocomplete="email"
                v-model="user.email"
                v-bind:isValid="isValidField('email')"
                v-on:input="validateFields"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('email')}}</div></template>
              </CInput>
              <CInput
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                v-model="user.password"
                v-bind:isValid="isValidField('password')"
                v-on:input="validateFields"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('password')}}</div></template>
                <template #prepend-content><CIcon name="cil-lock-locked"/></template>
              </CInput>
              <CInput
                placeholder="Repeat password"
                type="password"
                autocomplete="new-password"
                class="mb-4 is-valid"
                v-model="user.confirmPassword"
                v-bind:isValid="isValidField('confirmPassword')"
                v-on:input="validateFields"
              >
                  <template #invalid-feedback><div class="invalid-feedback">{{fieldError('confirmPassword')}}</div></template>
                <template #prepend-content><CIcon name="cil-lock-locked"/></template>
              </CInput>
              <CRow v-if="status">
                <CCol col="12">
                  <div col="12" class="alert alert-primary">{{status}}</div>
                </CCol>
              </CRow>
              <CButton color="success" v-on:click="register" block>Create Account</CButton>
              <CRow>
                <div col="12" style="margin: auto; margin-top: 15px">
                  <p style="text-align: center">Have an Account? <a href="#" v-on:click="$router.push('/login')">Sign In</a></p>
                </div>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import {AuthMutations} from "../../store";

export default {
  name: 'Register',
  data: function() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      canSubmit: false,
      error: null,
      status: null,
      fieldErrors: {

      }
    }
  },
  mounted: function() {
      this.validateFields();
  },
  methods: {
    largerThan: function(str, size) {
        return str.split(" ").join("").length > size;
    },
    validateFields: function() {

      this.fieldErrors = {};
      this.canSubmit = true;

      if (!this.largerThan(this.user.firstName, 0)) {
          this.fieldErrors.firstName = "First name is required.";
          this.canSubmit = false;
      }

      if (!this.largerThan(this.user.lastName, 0)) {
          this.fieldErrors.lastName = "Last name is required.";
          this.canSubmit = false;
      }

      if (!this.largerThan(this.user.username, 4)) {
          this.fieldErrors.username = "Username must be 5 or more characters.";
          this.canSubmit = false;
      }

      if (!this.largerThan(this.user.email, 0) || this.user.email.indexOf("@") === -1) {
          this.fieldErrors.email = "Valid email is required.";
          this.canSubmit = false;
      }

      if (!this.largerThan(this.user.password, 7)) {
          this.fieldErrors.password = "Password must be 8 or more characters.";
          this.fieldErrors.confirmPassword = this.fieldErrors.password;
          this.canSubmit = false;
      }

      if (this.user.password !== this.user.confirmPassword) {
          this.fieldErrors.confirmPassword = "Passwords don't match.";
          this.canSubmit = false;
      }

      console.log(this.fieldErrors);
    },
    isValidField: function(fieldName) {
      return !this.fieldErrors.hasOwnProperty(fieldName);
    },
    fieldError: function(fieldName) {
      if (!this.isValidField(fieldName)) {
        return this.fieldErrors[fieldName];
      } else {
        return "";
      }
    },
    register: async function() {
      this.status = "Registering Account";
      try {
        const user = await this.$http.post("backend-auth/register", this.user);
        const login = await this.$http.post("backend-auth/login", {
            usernameOrEmail: this.user.username,
            password: this.user.password
        });

      this.status = "Success!";

      this.$store.commit(AuthMutations.SetToken, login.jwt);
      this.$store.commit(AuthMutations.SetUser, login.user);

      setTimeout(() => {
          this.$router.push("/");
      }, 500);
      } catch (e) {

        if (e.message.toUpperCase().indexOf("USERNAME") !== -1) {
            this.fieldErrors.username = e.message;
        }

        if (e.message.toUpperCase().indexOf('EMAIL') !== -1) {
            this.fieldErrors.email = e.message;
        }

        this.error = "Invalid registration";
        this.status = null;
      }
    }
  },
}
</script>
