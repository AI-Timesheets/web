<template>
    <div>
        <CModal v-if="showModal" v-bind:show="showModal" title="Add Employee">
            <template #header>
                <h5 class="modal-title">
                    Add Employee
                </h5>
                <CButtonClose @click="showModal = false"/>
            </template>
            <employee-create v-bind:edit-employee="editingEmployee"></employee-create>
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
                    Employees
                </CCardTitle>
            </CCardHeader>
            <CCardBody>
                <employee-list></employee-list>
                <button class="btn btn-success" v-on:click="addEmployee" style="float: right">Add Employee</button>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>

    import Events from '../../events';

    const EmployeeList = () => import('@/views/employees/List');
    const EmployeeCreate = () => import('@/views/employees/Create');

    export default {
        components: {
            EmployeeList,
            EmployeeCreate,
        },
        mounted: function() {
            this.$root.$on(Events.EMPLOYEE_CREATE, () => {
                setTimeout(() => {
                    this.showModal = false;
                }, 1000)
            })

            this.$root.$on(Events.EMPLOYEE_UPDATE, () => {
                setTimeout(() => {
                    this.showModal = false;
                }, 1000)
            })

            this.$root.$on(Events.EMPLOYEE_DELETE, () => {
                setTimeout(() => {
                    this.showModal = false;
                }, 1000)
            })

            this.$root.$on(Events.TRIGGER_EMPLOYEE_UPDATE, (employee) => {
                this.editingEmployee = employee;
                this.showModal = true;
            })
        },
        data: function() {
            return {
                showModal: false,
                editingEmployee: null,
            }
        },
        methods: {
            addEmployee: function() {
                this.editingEmployee = null;
                this.showModal = true;
            }
        }
    }
</script>
