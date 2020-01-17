<template>
    <CForm>
        <CRow>
            <CCol col="6">
                <CInput
                        label="First Name"
                        placeholder="John"
                        v-bind:isValid="fields.firstName"
                        v-model="employee.firstName"
                        v-on:input="fields.firstName = null"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.firstName}}</div></template>
                </CInput>
            </CCol>
            <CCol col="6">
                <CInput
                        label="Last Name"
                        placeholder="Doe"
                        v-bind:isValid="fields.lastName"
                        v-model="employee.lastName"
                        v-on:input="fields.lastName = null"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.lastName}}</div></template>
                </CInput>
            </CCol>
        </CRow>
        <CRow>
            <CCol col="12">
                <CSelect label="Location" id="location" v-bind:options="locationOptions" v-on:update:value="setLocation($event)"></CSelect>
            </CCol>
        </CRow>
        <CRow>
            <CCol col="6">
                <CInput
                        label="Hourly Wage"
                        placeholder="10.00"
                        v-bind:isValid="fields.hourlyWage"
                        v-model="employee.hourlyWage"
                        v-on:input="fields.hourlyWage = null"
                        prepend="$"
                        type="number"
                        min="0"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.hourlyWage}}</div></template>
                </CInput>
            </CCol>
            <CCol col="6">
                <CInput
                        label="Login Code"
                        placeholder="0000"
                        v-bind:isValid="fields.loginCode"
                        v-model="employee.loginCode"
                        v-on:input="fields.loginCode = null"
                        min="0"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.loginCode}}</div></template>
                </CInput>
            </CCol>
        </CRow>
        <CRow class="form-group">
            <CCol col="10">
                <span style="float: right">Admin Employee?</span>
            </CCol>
            <CCol col="2">
                <CSwitch label="Admin Employee?" style="float: right" v-bind:checked="employee.isAdmin === 1 ? true : false" id="adminSwitch" size="sm" class="mx-1" color="primary" shape="pill" v-on:update:checked="setAdmin($event)"></CSwitch>
            </CCol>
        </CRow>
        <CRow v-if="status">
            <CCol col="12">
                <div col="12" class="alert alert-secondary">{{status}}</div>
            </CCol>
        </CRow>
        <CRow v-if="error">
            <CCol col="12">
                <div col="12" class="alert alert-danger">{{error}}</div>
            </CCol>
        </CRow>
        <CRow v-if="success">
            <CCol col="12">
                <div col="12" class="alert alert-primary">{{status}}</div>
            </CCol>
        </CRow>
        <CRow v-if="editing">
            <CCol col="6">
                <CButton color="success" block v-on:click="updateEmployee">Update Employee</CButton>
            </CCol>
            <CCol col="6">
                <CButton color="danger" block v-on:click="removeEmployee">Delete Employee</CButton>
            </CCol>
        </CRow>
        <CRow v-else>
            <CCol col="12">
                <CButton color="success" block v-on:click="create">Create Employee</CButton>
            </CCol>
        </CRow>
    </CForm>
</template>

<script>

    import {isFormException, isGenericException} from "../../exceptions/exceptionCheck";
    import {setFieldErrors} from "../../helpers/formHelper";
    import Events from "../../events";

    export default {
        data: function() {
            return {
                editing: false,
                name: "",
                nameError: null,
                error: "",
                status: "",
                success: false,
                employee: {
                    firstName: "",
                    lastName: "",
                    hourlyWage: null,
                    isAdmin: true,
                    loginCode: null,
                    locationId: 0,
                },
                fields: {
                    firstName: null,
                    lastName: null,
                    hourlyWage: null,
                    isAdmin: null,
                    loginCode: null,
                },
                fieldErrors: {
                    firstName: null,
                    lastName: null,
                    hourlyWage: null,
                    isAdmin: null,
                    loginCode: null,
                }
            }
        },
        mounted: function() {
            console.log(this.editEmployee);
            if (this.editEmployee) {
                this.editing = true;
                this.employee = {
                    id: this.editEmployee.id,
                    firstName: this.editEmployee.first_name,
                    lastName: this.editEmployee.last_name,
                    hourlyWage: this.editEmployee.hourly_wage,
                    isAdmin: this.editEmployee.is_admin,
                    loginCode: this.editEmployee.login_code,
                    locationId: this.editEmployee.location ? this.editEmployee.location.id : this.company.locations[0].id,
                }
            }

            this.employee.locationId = this.company.locations[0].id;
        },
        props: {
            editEmployee: Object,
        },
        methods: {
            create: async function() {
                this.status = "Creating Employee...";
                this.error = null;

                try {
                    await this.$http.post(`company/${this.company.id}/employee`, this.employee);
                    this.$root.$emit(Events.EMPLOYEE_CREATE);

                    this.status = "Employee Created";
                } catch (e) {
                    this.status = "";
                    if (isFormException(e)) {
                        setFieldErrors(this.fieldErrors, this.fields, e.fields);
                    } else if (isGenericException(e)) {
                        this.error = e.data;
                    } else {
                        this.error = e.message;
                    }
                }
            },
            removeEmployee: async function() {
                this.status = "Deleting Employee...";
                await this.$http.delete(`company/${this.company.id}/employee/${this.employee.id}`, this.employee);
                this.status = "Employee Deleted";
                this.$root.$emit(Events.EMPLOYEE_DELETE);
            },
            updateEmployee: async function() {
                this.status = "Updating Employee...";
                this.error = null;

                try {
                    await this.$http.put(`company/${this.company.id}/employee/${this.employee.id}`, this.employee);
                    this.$root.$emit(Events.EMPLOYEE_UPDATE);

                    this.status = "Employee Updated";
                } catch (e) {
                    this.status = "";
                    if (isFormException(e)) {
                        setFieldErrors(this.fieldErrors, this.fields, e.fields);
                    } else if (isGenericException(e)) {
                        this.error = e.data;
                    } else {
                        this.error = e.message;
                    }
                }
            },
            setLocation: function(locationId) {
                this.employee.locationId = locationId;
            },
            setAdmin: function(admin) {
                this.employee.isAdmin = admin;
            },
            isValid(field) {
                return this.fields[field];
            }
        },
        computed: {
            company: function() {
                return this.$store.getters.company;
            },
            locationOptions: function() {
                return this.company.locations.map(location => {
                    return {
                        label: location.name,
                        value: location.id,
                    }
                });
            }
        }
    }
</script>
