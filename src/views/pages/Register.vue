<template>
  <CContainer class="">
    <CRow class="w-100 justify-content-center">
      <CCol sm="8" md="6" style="margin-top: 5%">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <CForm v-if="!success">
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <CInput
                      placeholder="First Name"
                      autocomplete="firstname"
                      v-bind:isValid="isValidField('firstName')"
                      v-model="user.firstName"
                      v-on:input="fieldValid.firstName = null"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('firstName')}}</div></template>
              </CInput>
              <CInput
                      placeholder="Last Name"
                      autocomplete="lastname"
                      v-model="user.lastName"
                      v-bind:isValid="isValidField('lastName')"
                      v-on:input="fieldValid.lastName = null"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('lastName')}}</div></template>
              </CInput>
              <CInput
                placeholder="Username"
                autocomplete="username"
                v-model="user.username"
                v-bind:isValid="isValidField('username')"
                v-on:input="fieldValid.username = null"
              >
              <template #invalid-feedback><div class="invalid-feedback">{{fieldError('username')}}</div></template>
              </CInput>
              <CInput
                placeholder="Email"
                autocomplete="email"
                v-model="user.email"
                v-bind:isValid="isValidField('email')"
                v-on:input="fieldValid.email = null"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('email')}}</div></template>
              </CInput>
              <CInput
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                v-model="user.password"
                v-bind:isValid="isValidField('password')"
                v-on:input="fieldValid.password = null"
              >
                <template #invalid-feedback><div class="invalid-feedback">{{fieldError('password')}}</div></template>
                <template #prepend-content><CIcon name="cil-lock-locked"/></template>
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
              <CButton color="success" v-on:click="register" block>Create Account</CButton>
              <CRow>
                <div col="12" style="margin: auto; margin-top: 15px">
                  <p style="text-align: center">Have an Account? <a href="#" v-on:click="$router.push('/login')">Sign In</a></p>
                </div>
              </CRow>
            </CForm>
            <div v-else>
              <h3>Account registered successfully</h3>
              <p>Please check your email to finish up creating your account.</p>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import {AuthMutations} from "../../store";
import {isFormException} from "../../exceptions/exceptionCheck";

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
      success: false,
      fieldValid: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
      },
      fieldErrors: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
      }
    }
  },
  mounted: function() {

  },
  methods: {
    isValidField: function(fieldName) {
      return this.fieldValid[fieldName];
    },
    fieldError: function(fieldName) {
      return this.fieldErrors[fieldName];
    },
    register: async function() {
      this.status = "Registering Account";
      try {
        const user = await this.$http.post("backend-auth/register", this.user);

        this.status = "Success!";
        this.success = true;

      } catch (e) {

        this.status = null;

        if (isFormException(e)) {
          for (const field in e.fields) {
            this.fieldErrors[field] = e.fields[field].join("<br/>");
            this.fieldValid[field] = false;
          }
        } else {
          if (e.data.indexOf("Email") !== -1) {
            this.fieldErrors.email = e.data;
            this.fieldValid.email = false;
          }

          if (e.data.indexOf("Username") !== -1) {
            this.fieldErrors.username = e.data;
            this.fieldValid.username = false;
          }
        }
      }
    }
  },
}
</script>
