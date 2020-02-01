<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5">
        <dashboard-info />
        <clocked-in-employees />
      </div>
      <div class="col-md-7">
        <TimeclockLogs />
      </div>
    </div>
  </div>
</template>

<script>
  import DashboardInfo from "./dashboard/Info";
  import TimeclockLogs from "./dashboard/TimeclockLogs";
  import ClockedInEmployees from "./dashboard/ClockedInEmployees";

  export default {
  name: 'Dashboard',
  components: {
    TimeclockLogs,
    DashboardInfo,
    ClockedInEmployees,
  },
  mounted: async function() {

  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>
