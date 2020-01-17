<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      v-c-emit-root-event:toggle-sidebar-mobile
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      v-c-emit-root-event:toggle-sidebar
    />
    <CHeaderBrand
      class="mx-auto d-lg-none"
      src="img/brand/coreui-base.svg"
      width="97"
      height="46"
      alt="CoreUI Logo"
    />
    <CHeaderNav class="d-md-down-none mr-auto" v-if="companies.length > 1">
      <CHeaderNavItem class="company-info">
        <CSelect v-bind:options="companies" v-on:update:value="setCompany">
        </CSelect>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav v-else-if="companies.length === 1">
      <CHeaderNavItem class="company-info">
        <h4>Company: {{company.name}}</h4>
        <p>Code: {{company.company_code}}</p>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import {CompanyMutations, store} from "../store";
import Events from "../events";
import {List, ListHelper} from "../helpers/listHelper";

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  data: function() {
    return {
      companies: [],
      company: null,
      companyKey: "",
    }
  },
  mounted: async function() {
    this.company = store.getters.company;
    this.refresh();

    this.$on(Events.COMPANY_CREATE, () => {
      this.refresh();
    })
  },
  methods: {
    refresh: async function() {
      this.companies = (await this.$http.get("company")).map(company => {
        return {
          company: company,
          value: company.company_code,
          label: company.name + " (" + company.company_code + ")",
        }
      })
    },
    setCompany: function(e) {
      const company = ListHelper.findById(this.companies, e, (el) => el.company.company_code).company;
      this.$store.commit(CompanyMutations.SetCompany, company);
      this.company = store.getters.company;
      this.$root.$emit(Events.COMPANY_CHANGE);
    }
  }
}
</script>

<style scoped>
  .company-info p,h4,select,.form-group {
    padding: 0;
    margin: 0;
  }
</style>
