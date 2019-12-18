<template>
    <CForm>
        <CInput
                placeholder="Company Name"
                v-bind:isValid="nameError ? false : null"
                v-model="name"
                v-on:input="nameError = null"
        >
            <template #invalid-feedback><div class="invalid-feedback">{{nameError}}</div></template>
        </CInput>
        <CButton color="success" block v-on:click="create">Create Company</CButton>
        <CRow v-if="error">
            <CCol col="12">
                <div col="12" class="alert alert-danger">{{error}}</div>
            </CCol>
        </CRow>
        <CRow v-if="success">
            <CCol col="12">
                <div col="12" class="alert alert-success">{{status}}</div>
            </CCol>
        </CRow>
    </CForm>
</template>

<script>

import {isFormException} from "../../exceptions/exceptionCheck";
import Events from "../../events";

export default {
    data: function() {
        return {
            name: "",
            nameError: null,
            error: "",
            status: "",
            success: false,
        }
    },
    methods: {
        create: async function() {
            this.status = "Creating Company...";

            try {
                const company = await this.$http.post("company", {
                    name: this.name,
                });

                this.$root.$emit(Events.COMPANY_CREATE);
            } catch (e) {
                if (isFormException(e)) {
                    this.nameError = e.fields.name[0];
                }
            }
        }
    }
}
</script>