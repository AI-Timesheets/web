<template>
    <div>
        <center v-if="loading"><CSpinner color="primary" size="lg" style="width:4rem; height:4rem;"></CSpinner></center>
        <CDataTable
                v-else
                :hover="true"
                :items="locations"
                :fields="fields"
                :items-per-page="8"
                :clickableRows="true"
                pagination
                v-on:row-clicked="openLocation($event)"
        >
        </CDataTable>
    </div>
</template>

<script>
import Events from '../../events';

export default {
    data: function() {
        return {
            fields: ["name", "country", "state", "city", "zip_code", "address"],
            locations: [],
            loading: true,
        }
    },
    mounted: async function() {

        console.log(this.company);
        this.refresh();

        this.$root.$on(Events.LOCATION_CREATE, () => {
            this.refresh();
        });

        this.$root.$on(Events.LOCATION_UPDATE, () => {
            this.refresh();
        });

        this.$root.$on(Events.LOCATION_DELETE, () => {
            this.refresh();
        });

        this.$root.$on(Events.COMPANY_CHANGE, () => {
            this.refresh();
        })
    },
    methods: {
        refresh: async function() {
            this.loading = true;
            this.locations = await this.$http.get(`company/${this.company.id}/location`);
            this.loading = false;
        },
        openLocation: function(location) {
            this.$root.$emit(Events.TRIGGER_LOCATION_UPDATE, location);
        }
    },
    computed: {
        company: function() {
            return this.$store.getters.company;
        }
    }
}
</script>
