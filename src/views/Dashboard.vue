<template>
  <div>
  </div>
</template>

<script>

  export default {
  name: 'Dashboard',
  components: {

  },
  mounted: async function() {

  },
  data () {
    return {}
  },
  methods: {
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>
