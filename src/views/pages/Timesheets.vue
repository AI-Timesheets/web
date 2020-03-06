<template>
    <CCard>
        <CCardHeader>
            <CCardTitle>
                <h3>Timesheets</h3>
                <CForm>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Year</label>
                            <select class="form-control" v-model="parameters.year">
                                <option v-for="year in configs.years.get()">{{year}}</option>
                            </select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Week</label>
                            <select class="form-control" v-model="parameters.week">
                                <option v-for="week in configs.weeks.get()">{{week}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Start Date</label>
                            <input class="form-control" type="date" v-model="parameters.startDate" />
                        </div>
                        <div class="col-md-6 form-group">
                            <label>End Date</label>
                            <input class="form-control" type="date" v-model="parameters.endDate" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label>Location</label>
                            <select class="form-control" v-model="parameters.location">
                                <option v-for="location in company.locations">{{location.name}}</option>
                            </select>
                        </div>
                    </div>
                </CForm>
            </CCardTitle>
        </CCardHeader>
        <CCardBody>
            <table class="table">
                <thead>
                    <th></th>
                    <th v-for="date in timesheet.dates">{{formatDate(date)}}</th>
                </thead>
                <tbody>
                    <tr v-for="ts in Object.values(timesheet.ts)">
                        <td>{{ts.employeeName}}</td>
                        <td v-for="date in ts.dates">{{formatDuration(date)}}</td>
                    </tr>
                </tbody>
            </table>
        </CCardBody>
    </CCard>
</template>

<script>
    import {DateTime} from "luxon";
    import {List} from "../../helpers/listHelper";
    import TimeHelper from "../../helpers/timeHelper";

    // 0 refers to sunday, 6 refers to saturday.
    const WEEK_START_DAY = 0;

    export default {
        name: "Timesheets",
        data: function() {
            return {
                configs: {
                    years: List.range(2019, 2030),
                    weeks: List.range(1, 53),
                },
                parameters: {
                    year: DateTime.fromJSDate(new Date()).year,
                    week: DateTime.fromJSDate(new Date()).weekNumber,
                    startDate: DateTime.fromJSDate(new Date())
                        .startOf('week')
                        .toISODate(),
                    endDate: DateTime.fromJSDate(new Date())
                        .endOf('week')
                        .toISODate(),
                    location: null,
                },
                timesheet: {
                    names: [],
                    dates: [],
                    ts: {}
                },
            }
        },
        mounted: function() {
            this.parameters.location = this.company.locations[0];
            console.log(this.parameters.location)
            this.getTimesheet();
        },
        methods: {
            updateDates: function() {

                console.log(this.company.locations);

                const beginningOfYearInSeconds = DateTime.fromObject({
                    year: this.parameters.year,
                    month: 1,
                    day: 1,
                }).toSeconds();

                const adjustedDateInSeconds = beginningOfYearInSeconds + (this.parameters.week - 1) * 7 * 24 * 3600;

                this.parameters.startDate = DateTime.fromSeconds(adjustedDateInSeconds)
                    .startOf('week')
                    .toISODate();

                this.parameters.endDate = DateTime.fromSeconds(adjustedDateInSeconds)
                    .endOf('week')
                    .toISODate();

                this.getTimesheet();
            },
            formatDate: function(date) {
                return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
            },
            formatDuration: function(duration) {
                return (duration / 3600).toFixed(2);
            },
            getTimesheet: async function() {
                this.timesheet = await this.$http.post("export/timesheet", {
                    startDate: this.parameters.startDate,
                    endDate: this.parameters.endDate,
                    companyId: this.company.id,
                    locationId: this.parameters.location.id,
                });
            }
        },
        watch: {
            "parameters.year": function() {
                this.updateDates();
            },
            "parameters.week": function() {
                this.updateDates();
            },
            "parameters.startDate": function() {
                this.getTimesheet();
            },
            "parameters.endDate": function() {
                this.getTimesheet();
            },
            "parameters.location": function() {
                console.log(this.parameters.location.name);
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
    label {
        text-size: 12px;
    }
</style>