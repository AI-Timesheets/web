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
                <CCardBody>
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="clock_in_type">
                                <CIcon class="clock_in_type_icon" name="cil-alarm" />
                                <p class="clock_in_type_label" v-if="log.type === 'CLOCKED_IN'">Clock In</p>
                                <p class="clock_in_type_label" v-else>Clock Out</p>
                            </div>
                        </div>
                        <div class="col-xs-10">
                            <p>
                                <b>{{log.company_employee.first_name}} {{log.company_employee.last_name}}</b>
                                &nbsp;
                                <span v-if="log.type === 'CLOCKED_IN'">clocked in at</span>
                                <span v-else>clocked out from</span>
                                {{log.location.name}}
                            </p>
                            <p><b>Time: </b>{{formatDate(log.timestamp)}}</p>
                            <p v-if="log.geographic_location"><b>Location: </b>{{log.geographic_location.address}}, {{log.geographic_location.city}} {{log.geographic_location.state}}</p>
                        </div>
                    </div>
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

    .clock_in_type {
        background-color: blue;
        width: 100%;
        height: 5em;
        text-align: center;
        padding-top: 5px;
    }

    .clock_in_type_label {
        color: white;
    }

    .clock_in_type_icon {
        color: white;
        width: 70%;
        height: 70%;
    }
</style>