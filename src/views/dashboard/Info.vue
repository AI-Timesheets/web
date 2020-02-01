<template>
    <CCard>
        <CCardBody>
            <CCallout color="info">
                <strong class="h2">{{company.name}} ({{company.company_code}})</strong>
                <br />
                <small class="text-muted">{{now}}</small><br>
            </CCallout>
        </CCardBody>
    </CCard>
</template>

<script>
    import {DateTime} from "luxon";
    import TimeHelper from "../../helpers/timeHelper";

    export default {
        name: "DashboardInfo",
        data: function() {
            return {
                now: this.getTime(),
                timer: null,
            }
        },
        mounted: function() {
            this.timer = setInterval(() => {
                this.now = this.getTime();
            }, 1000);
        },
        destroyed: function() {
            clearInterval(this.timer);
        },
        methods: {
            getTime: function() {
                return TimeHelper.currentTime();
            }
        },
        computed: {
            company: function() {
                return this.$store.getters.company;
            }
        }
    }
</script>