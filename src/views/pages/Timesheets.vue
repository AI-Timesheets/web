<template>
    <CCard>
        <CCardHeader>
            <CCardTitle>
                <h3>Timesheets</h3>
                <CForm>
                    <CFormGroup>
                        <label>Select Timesheet by </label>
                        <select class="form-control">
                            <option>Week and Year</option>
                            <option>Date Range</option>
                        </select>
                    </CFormGroup>
                </CForm>
            </CCardTitle>
        </CCardHeader>
        <CCardBody>

        </CCardBody>
    </CCard>
</template>

<script>
    export default {
        name: "Timesheets",
        data: function() {
            return {

            }
        }
    }
</script>