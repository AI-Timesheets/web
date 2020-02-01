<template>
    <div>
        <center v-if="loading"><CSpinner color="primary" size="lg" style="width:4rem; height:4rem;"></CSpinner></center>
        <CDataTable
                v-else
                :hover="true"
                :items="employees"
                :fields="fields"
                :items-per-page="8"
                :clickableRows="true"
                pagination
                v-on:row-clicked="openEmployee($event)"
        >
            <template #status="{item}">
                <td>
                    <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
                </td>
            </template>
        </CDataTable>
    </div>

</template>

<script>
    import Events from '../../events';
    import {ListHelper} from "../../helpers/listHelper";

    export default {
        data: function() {
            return {
                fields: ["location", "name", "hourly_wage", "login_code", "is_admin", "status"],
                employees: [],
                rawEmployees: [],
                loading: true,
            }
        },
        mounted: async function() {

            console.log(this.company);
            this.refresh();

            this.$root.$on(Events.EMPLOYEE_CREATE, () => {
                this.refresh();
            });

            this.$root.$on(Events.EMPLOYEE_UPDATE, () => {
                this.refresh();
            });

            this.$root.$on(Events.EMPLOYEE_DELETE, () => {
                this.refresh();
            });

            this.$root.$on(Events.COMPANY_CHANGE, () => {
                this.refresh();
            })
        },
        methods: {
            refresh: async function() {
                this.loading = true;
                this.rawEmployees = await this.$http.get(`company/${this.company.id}/employee`)
                this.loading = false;
                this.employees = this.rawEmployees.map(employee => {
                    return {
                        id: employee.id,
                        name: employee.first_name + " " + employee.last_name,
                        login_code: employee.login_code,
                        hourly_wage: '$' + employee.hourly_wage + " / hr",
                        is_admin: employee.is_admin == true ? 'Yes' : 'No',
                        location: employee.location ? employee.location.name : "Unassigned",
                        status: employee.status === 'ACTIVE' ? 'Active' : 'Inactive'
                    }
                })
            },
            openEmployee: function(employee) {
                this.$root.$emit(Events.TRIGGER_EMPLOYEE_UPDATE, ListHelper.findById(this.rawEmployees, employee.id, (emp) => emp.id));
            },
            getBadge: function(status) {
                return status === 'Active'? 'success' : 'danger';
            }
        },
        computed: {
            company: function() {
                return this.$store.getters.company;
            }
        }
    }
</script>
