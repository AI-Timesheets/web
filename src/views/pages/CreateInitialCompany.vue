<template>
    <CContainer class="">
        <CRow class="w-100 justify-content-center">
            <CCol sm="8" md="6" style="margin-top: 5%">
                <CCard class="mx-4 mb-0">
                    <CCardBody class="p-4">
                        <CForm>
                            <h1>Register</h1>
                            <p class="text-muted">Create your company</p>

                            <CInput
                                    placeholder="Company Name"
                                    v-bind:isValid="fieldErrors.companyName ? false : null"
                                    v-model="companyName"
                                    v-on:input="fieldErrors.companyName = null"
                            >
                                <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.companyName}}</div></template>
                            </CInput>

                            <CInput
                                    placeholder="Primary Location"
                                    v-bind:isValid="fieldErrors.locationName ? false : null"
                                    v-model="locationName"
                                    v-on:input="fieldErrors.locationName = null"
                            >
                                <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.locationName}}</div></template>
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
                            <CButton color="primary" v-on:click="register" block>Register Company</CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script>
    import {store, AuthMutations, CompanyMutations} from "../../store";
    import {isFormException} from "../../exceptions/exceptionCheck";
    import {setFieldErrors} from "../../helpers/formHelper";

    export default {
        name: 'CreateInitialCompany',
        data: function() {
            return {
                companyName: "",
                locationName: "",
                error: null,
                status: null,
                success: false,
                fieldErrors: {
                    companyName: null,
                    locationName: null,
                }
            }
        },
        mounted: function() {

        },
        methods: {
            register: async function() {
                try {
                    this.status = "Registering Company...";

                    const response = await this.$http.post("company/initial", {
                        companyName: this.companyName,
                        locationName: this.locationName,
                    });

                    store.commit(CompanyMutations.SetCompany, response.company);

                    this.$router.push({name: "Dashboard"});

                } catch (e) {
                    this.status = null;

                    if (isFormException(e)) {
                        setFieldErrors(this.fieldErrors, e.fields);
                    }
                }
            }
        },
    }
</script>
