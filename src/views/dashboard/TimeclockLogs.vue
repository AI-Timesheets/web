<template>
    <CCard>
        <CCardHeader>
            <CCardTitle style="display: inline">
                <h3>TimeClock Feed</h3>
            </CCardTitle>
        </CCardHeader>
        <CCardBody v-if="!initialized">
            <center><CSpinner color="primary" size="lg" style="width:4rem; height:4rem;"></CSpinner></center>
        </CCardBody>
        <CCardBody v-else style="max-height: 500px; overflow-y: scroll">
            <CCard v-for="log in logs">
                <CCardBody v-if="log.type === 'CLOCKED_IN'">
                    <p><b>{{log.company_employee.first_name}} {{log.company_employee.last_name}}</b> clocked in to {{log.location.name}} on {{formatDate(log.timestamp)}}</p>
                </CCardBody>
                <CCardBody v-else>
                    <p><b>{{log.company_employee.first_name}} {{log.company_employee.last_name}}</b> clocked out from {{log.location.name}} on {{formatDate(log.timestamp)}}</p>
                    <p>Clocked in for {{duration(log.clock_in.timestamp, log.timestamp)}}</p>
                </CCardBody>
            </CCard>
        </CCardBody>
    </CCard>
</template>

<script>

    import {DateTime} from "luxon";
    import TimeHelper from "../../helpers/timeHelper";

    export default {
        name: "TimeclockLogs",
        data: function() {
            return {
                logs: [],
                time: this.currentTime(),
                initialized: false,
                refreshTimer: null,
                clockTimer: null,
                alive: true,
            }
        },
        mounted: async function() {

            this.getLogs();

            this.refreshTimer = setInterval(() => {
                this.getLogs();
            }, 2000);
        },
        beforeDestroy: function() {
            this.alive = false;
        },
        destroyed: function() {
            clearInterval(this.refreshTimer);
            clearInterval(this.clockTimer);
        },
        methods: {
            getLogs: async function() {
                this.logs = await this.$http.get(`/company/${this.company.id}/timeclock-logs`);
                this.initialized = true;
            },
            currentTime: function() {
                return TimeHelper.currentTime();
            },
            formatDate: function(date) {
                return TimeHelper.formatISOTime(date);
            },
            duration: function(date1, date2) {
                const delta = DateTime.fromISO(date2) - DateTime.fromISO(date1);
                return TimeHelper.formatDuration(delta);
            }
        },
        computed: {
            company: function() {
                return this.$store.getters.company;
            }
        }
    }
</script>

<style scoped>
    p {
        margin: 0px;
    }
</style>