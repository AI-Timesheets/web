<template>
    <CDataTable
        :hover="true"
        :items="locations"
        :fields="fields"
        :items-per-page="8"
        :clickableRows="true"
        pagination
        v-on:row-clicked="openLocation($event)"
      >
    </CDataTable>
</template>

<script>
import Events from '../../events';

export default {
    data: function() {
        return {
            fields: ["name", "country", "state", "city", "zip_code", "address"],
            locations: [],
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
    },
    methods: {
        refresh: async function() {
            this.locations = await this.$http.get(`company/${this.company.id}/location`);
            console.log(this.locations);
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
