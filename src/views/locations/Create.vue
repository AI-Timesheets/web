<template>
    <CForm>
        <CInput
                label="Location Name"
                placeholder="Head Quarters"
                v-bind:isValid="fields.name"
                v-model="location.name"
                v-on:input="fields.name = null"
        >
            <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.name}}</div></template>
        </CInput>
        <CRow>
            <CCol col="4">
                <CInput
                        label="Country"
                        placeholder="USA"
                        v-bind:isValid="fields.country"
                        v-on:input="fields.country = null"
                        v-model="location.country"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.country}}</div></template>
                </CInput>
            </CCol>
            <CCol col="3">
                <CInput
                        label="State"
                        placeholder="MI"
                        v-bind:isValid="fields.state"
                        v-on:input="fields.state = null"
                        v-model="location.state"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.state}}</div></template>
                </CInput>
            </CCol>
            <CCol col="5">
                <CInput
                        label="City"
                        placeholder="Detroit"
                        v-bind:isValid="fields.city"
                        v-on:input="fields.city = null"
                        v-model="location.city"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.city}}</div></template>
                </CInput>
            </CCol>
        </CRow>
        <CRow>
            <CCol col="4">
                <CInput
                        label="Zip Code"
                        placeholder="48012"
                        v-bind:isValid="fields.zipCode"
                        v-on:input="fields.zipCode = null"
                        v-model="location.zipCode"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.zipCode}}</div></template>
                </CInput>
            </CCol>
            <CCol col="8">
                <CInput
                        label="Address"
                        placeholder="1 Campus Martius"
                        v-bind:isValid="fields.address"
                        v-on:input="fields.address = null"
                        v-model="location.address"
                >
                    <template #invalid-feedback><div class="invalid-feedback">{{fieldErrors.address}}</div></template>
                </CInput>
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
            <CCol col="6" v-if="company.locations.length > 1">
                <CButton color="success" block v-on:click="updateLocation">Update Location</CButton>
            </CCol>
            <CCol col="6" v-if="company.locations.length > 1">
                <CButton color="danger" block v-on:click="removeLocation">Delete Location</CButton>
            </CCol>
            <CCol col="12" v-if="company.locations.length <= 1">
                <CButton color="success" block v-on:click="updateLocation">Update Location</CButton>
            </CCol>
        </CRow>
        <CRow v-else>
            <CCol col="12">
                <CButton color="success" block v-on:click="create">Create Location</CButton>
            </CCol>
        </CRow>
    </CForm>
</template>

<script>

import {isFormException, isGenericException} from "../../exceptions/exceptionCheck";
import {setFieldErrors} from "../../helpers/formHelper";
import Events from "../../events";
import {CompanyMutations} from "../../store";

export default {
    data: function() {
        return {
            editing: false,
            name: "",
            nameError: null,
            error: "",
            status: "",
            success: false,
            location: {
                name: "",
                country: "",
                state: "",
                city: "",
                zipCode: "",
                address: "",
            },
            fields: {
                name: null,
                country: null,
                state: null,
                city: null,
                zipCode: null,
                address: null,
            },
            fieldErrors: {
                name: null,
                country: null,
                state: null,
                city: null,
                zipCode: null,
                address: null,
            }
        }
    },
    mounted: function() {
        console.log(this.editLocation);
        if (this.editLocation) {
            this.editing = true;
            this.location = {
                id: this.editLocation.id,
                name: this.editLocation.name,
                country: this.editLocation.country,
                state: this.editLocation.state,
                city: this.editLocation.city,
                zipCode: this.editLocation.zip_code,
                address: this.editLocation.address,
            }
        }
    },
    props: {
        editLocation: Object,
        canDelete: Boolean,
    },
    methods: {
        create: async function() {
            this.status = "Creating Location...";

            try {
                await this.$http.post(`company/${this.company.id}/location`, this.location);
                this.$root.$emit(Events.LOCATION_CREATE);

                this.location = {
                    name: "",
                    country: "",
                    state: "",
                    city: "",
                    zipCode: "",
                    address: "",
                }

                this.status = "Location Created";
                this.commitCompany();
            } catch (e) {
                this.status = "";
                if (isFormException(e)) {
                    setFieldErrors(this.fieldErrors, this.fields, e.fields);
                } else {
                    this.error = e.message;
                }
            }
        },
        updateLocation: async function() {
            this.status = "Updating Location...";
            this.error = null;

            try {
                await this.$http.put(`company/${this.company.id}/location/${this.location.id}`, this.location);
                this.$root.$emit(Events.LOCATION_UPDATE);

                this.location = {
                    name: "",
                    country: "",
                    state: "",
                    city: "",
                    zipCode: "",
                    address: "",
                }

                this.status = "Location Updated";
                this.commitCompany();
            } catch (e) {
                this.status = "";
                if (isFormException(e)) {
                    setFieldErrors(this.fieldErrors, this.fields, e.fields);
                } else {
                    this.error = e.message;
                }
            }
        },
        removeLocation: async function() {
            this.error = null;
            try {
                this.status = "Deleting Location...";
                await this.$http.delete(`company/${this.company.id}/location/${this.location.id}`, this.location);
                this.$root.$emit(Events.LOCATION_DELETE);
                this.status = "Location Deleted";
                this.commitCompany();
            } catch (e) {
                this.status = false;
                if (isGenericException(e)) {
                    this.error = e.data;
                } else {
                    this.error = e.message;
                }
            }
        },
        commitCompany: async function() {
            const company = await this.$http.get(`company/${this.company.id}`);
            console.log(company);
            this.$store.commit(CompanyMutations.SetCompany, company);
        },
        isValid(field) {
            return this.fields[field];
        }
    },
    computed: {
        company: function() {
            return this.$store.getters.company;
        }
    }
}
</script>
