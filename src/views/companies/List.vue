<template>
    <CDataTable
        :hover="true"
        :items="companies"
        :fields="fields"
        :items-per-page="5"
        :clickableRows="true"
        pagination
        v-on:row-clicked="gotoCompany($event)"
      >
    </CDataTable>
</template>

<script>
import Events from '../../events';

export default {
    data: function() {
        return {
            fields: ["name", "company_code"],
            companies: []
        }
    },
    mounted: async function() {
        this.refresh();

        this.$root.$on(Events.COMPANY_CREATE, () => {
            this.refresh();
        });

        this.$on('row-clicked', (company) => {
            console.log(company);
        })
    },
    methods: {
        refresh: async function() {
            this.companies = await this.$http.get("company");
        },
        gotoCompany: function(company) {
            this.$router.push("company/" + company.company_code);
        }
    }
}
</script>