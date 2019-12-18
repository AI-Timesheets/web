<template>
    <div>
        <CCard>
            <CCardHeader>
                <CCardTitle>
                    <CIcon name="cil-globe-alt"/> 
                    Create a new Company
                </CCardTitle>
            </CCardHeader>
            <CCardBody>
                <company-create/>
            </CCardBody>
        </CCard>
        <CCard>
            <CCardHeader>
                <CCardTitle>
                    <CIcon name="cil-globe-alt"/> 
                    Companies
                </CCardTitle>
            </CCardHeader>
            <CCardBody>
                <company-list/>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>

const CompanyList = () => import('@/views/companies/List');
const CompanyCreate = () => import('@/views/companies/Create');

export default {
    components: {
        CompanyList,
        CompanyCreate,
    }
}
</script>