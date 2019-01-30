<template>
    <div class="admin-pages">
          <PageTitle icon="fa fa-cogs" main="System Adm" sub="Registers & More"/>
          <div class="admin-pages-tabs">
            <b-card no-body>
              <b-tabs card>
                <b-tab title="Users" title-link-class="bg-primary text-white text-uppercase">
                 <UserAdmin/>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
    </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import UserAdmin from "./UserAdmin";

export default {
    name: "AdminPages",
    components: { PageTitle, UserAdmin }
};
</script>

<style>
</style>
