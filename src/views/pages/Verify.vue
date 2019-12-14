<template>
    <CContainer class="">
    <CRow class="w-100 justify-content-center">
      <CCol sm="8" md="6" style="margin-top: 5%">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <h3>{{status}}</h3>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </CContainer>
</template>

<script>
import { AuthMutations } from '../../store';
export default {
    data: function() {
        return {
            status: "Verifying Account...",
        }
    },
    mounted: async function() {
        try {
            const response = await this.$http.post("backend-auth/verify/" + this.$route.params.key);
            this.$store.commit(AuthMutations.SetToken, response.jwt);
            this.$store.commit(AuthMutations.SetUser, response.user);
            this.status = "Account verified successfully! :)"
            setTimeout(() => this.$router.push("/"), 500);
        } catch (e) {
            this.status = e.message + " :(";
        }
    }
}
</script>