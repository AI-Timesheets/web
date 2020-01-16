<template>
    <div>
        <CModal v-bind:show="showModal" title="Add Location">
            <template #header>
                <h5 class="modal-title">
                    Add Location
                </h5>
                <CButtonClose @click="showModal = false"/>
            </template>
            <location-create v-if="showModal" v-bind:edit-location="editingLocation"></location-create>
            <template #footer>
                <button
                        type="button"
                        class="btn btn-secondary"
                        @click="showModal = false"
                >
                    Cancel
                </button>
            </template>

        </CModal>
        <CCard>
            <CCardHeader>
                <CCardTitle>
                    <CIcon name="cil-globe-alt"/>
                    Locations
                </CCardTitle>
            </CCardHeader>
            <CCardBody>
                <location-list/>
                <button class="btn btn-success" v-on:click="addLocation" style="float: right">Add Location</button>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>

import Events from '../../events';

const LocationList = () => import('@/views/locations/List');
const LocationCreate = () => import('@/views/locations/Create');

export default {
    components: {
        LocationList,
        LocationCreate,
    },
    mounted: function() {
        this.$root.$on(Events.LOCATION_CREATE, () => {
            setTimeout(() => {
                this.showModal = false;
            }, 1000);
        })

        this.$root.$on(Events.LOCATION_DELETE, () => {
            setTimeout(() => {
                this.showModal = false;
            }, 1000);
        });

        this.$root.$on(Events.LOCATION_UPDATE, () => {
            setTimeout(() => {
                this.showModal = false;
            }, 1000);
        });

        this.$root.$on(Events.TRIGGER_LOCATION_UPDATE, (location) => {
            this.showModal = true;
            this.editingLocation = {...location};
        })
    },
    data: function() {
        return {
            showModal: false,
            editingLocation: null,
        }
    },
    methods: {
        addLocation: function() {
            this.editingLocation = null;
            this.showModal = true;
        }
    }
}
</script>
