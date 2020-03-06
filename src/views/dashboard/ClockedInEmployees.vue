<template>
    <CCard>
        <CCardHeader>
            <CCardTitle style="display: inline">
                <h3>Clocked In Employees</h3>
            </CCardTitle>
        </CCardHeader>
        <CCardBody v-if="loading">
            <center><CSpinner color="primary" size="lg" style="width:4rem; height:4rem;"></CSpinner></center>
        </CCardBody>
        <CCardBody v-else>
            <table class="table">
                <thead>
                    <th>Employee</th>
                    <th>Clocked In At</th>
                    <th>Time Worked</th>
                </thead>
                <tbody>
                    <tr v-for="log in employeeLogs">
                        <td>{{log.company_employee.first_name}} {{log.company_employee.last_name}}</td>
                        <td>{{formatDate(log.timestamp)}}</td>
                        <td>{{clockedInDuration(log.timestamp)}}</td>
                    </tr>
                </tbody>
            </table>
        </CCardBody>
    </CCard>
</template>
<script>
    import TimeHelper from "../../helpers/timeHelper";
    import {DateTime} from "luxon";

    export default {
        name: "ClockedInEmployees",
        data: function() {
            return {
                employeeLogs: [],
                loading: false,
                initialized: false,
            }
        },
        mounted: async function() {
            this.getEmployees();

            setInterval(() => {
                this.$forceUpdate();
                this.getEmployees();
            }, 1000);
        },
        methods: {
            getEmployees: async function() {
                if (!this.initialized) {
                    this.initialized = true;
                    this.loading = true;
                }
                this.employeeLogs = await this.$http.get(`/company/${this.company.id}/clocked-in-employees`);
                this.loading = false;
            },
            formatDate: function(date) {
                return TimeHelper.formatISOTime(date);
            },
            clockedInDuration: function(date) {
                const delta = DateTime.fromJSDate(new Date()) - DateTime.fromISO(date);
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