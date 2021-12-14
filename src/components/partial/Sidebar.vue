<template>
    <div>
        <div class="main-sidebar">
            <aside id="sidebar-wrapper">
                <div class="sidebar-brand">
                    <a href="#">Simphini</a>
                </div>
                <div class="sidebar-brand sidebar-brand-sm">
                    <a href="#">St</a>
                </div>
                <ul class="sidebar-menu">
                    <li class="nav-item">
                        <b-link class="nav-link" to="/admin/dashboard"><i class="fas fa-th-large"></i><span>Dashboard</span></b-link>
                    </li>
                    <li class="nav-item">
                        <b-link class="nav-link" to="/admin/clients"><i class="fas fa-user-friends"></i><span>Client List</span></b-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'Users' }"><i class="fas fa-user"></i><span>Manage User</span></router-link>
                    </li>
                    <li class="nav-item dropdown" v-bind:class="{ 'active': isSettingClick }">
                        <a href="javascript:;" class="nav-link has-dropdown" @click="menuSetting"><i class="fas fa-cogs"></i> <span>Settings</span></a>
                        <transition name="slide" :duration="200">
                            <ul class="dropdown-menu show" v-if="isSettingClick">
                                <li>
                                    <b-link class="nav-link" to="/admin/settings/email">Email Settings</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/settings/network">Network Configuration</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/settings/backup-restoration">Backup &amp; Restoration</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/settings/manage-properties">Print/Export Properties</b-link>
                                </li>
                                <li><a class="nav-link" href="#">Manage Role</a></li>
                                <li><a class="nav-link" href="#">User Setting</a></li>
                            </ul>
                        </transition>
                    </li>
                    <li class="nav-item dropdown" v-bind:class="{ 'active': isReportsClick }">
                        <a href="javascript:;" class="nav-link has-dropdown" @click="menuReports"><i class="fas fa-chart-area"></i> <span>Reports</span></a>
                        <transition name="slide">
                            <ul class="dropdown-menu show" v-if="isReportsClick">
                                <li>
                                    <b-link class="nav-link" to="/admin/reports/analytics">Client Analytics</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/reports/revenue">Client Revenues</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/reports/audit_trail">Audit Trail</b-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                    <li class="nav-item dropdown" v-bind:class="{ 'active': isPicklistsClick }">
                        <a href="javascript:;" class="nav-link has-dropdown" @click="menuPicklists"><i class="fas fa-list"></i> <span>Picklists</span></a>
                        <transition name="slide">
                            <ul class="dropdown-menu show" v-if="isPicklistsClick">
                                <li>
                                    <b-link class="nav-link" to="/admin/picklists/country">Country</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/picklists/treatment">Treatment</b-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                    <li class="nav-item dropdown" v-bind:class="{ 'active': isSalesAndInvoiceClick }">
                        <a href="javascript:;" class="nav-link has-dropdown" @click="menuSalesAndInvoice"><i class="fas fa-receipt"></i> <span>Sales and Invoice</span></a>
                        <transition name="slide">
                            <ul class="dropdown-menu show" v-if="isSalesAndInvoiceClick">
                                <li>
                                    <b-link class="nav-link" to="/admin/sales_and_invoice/sales">Sales</b-link>
                                </li>
                                <li>
                                    <b-link class="nav-link" to="/admin/sales_and_invoice/invoice">Invoice</b-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                </ul>
          </aside>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                isSettingClick: false,
                isAvailable: false,
                isReportsClick: false,
                isSalesAndInvoiceClick: false,
                isPicklistsClick: false
            }
        },
        methods: {
            menuSetting(){
                this.isSettingClick = !this.isSettingClick
                this.isReportsClick = false
                this.isSalesAndInvoiceClick = false
                this.isPicklistsClick = false
            },
            menuReports(){
                this.isReportsClick = !this.isReportsClick
                this.isSettingClick = false
                this.isSalesAndInvoiceClick = false
                this.isPicklistsClick = false
            },
            menuSalesAndInvoice(){
                this.isSalesAndInvoiceClick = !this.isSalesAndInvoiceClick
                this.isSettingClick = false
                this.isReportsClick = false
                this.isPicklistsClick = false
            },
            menuPicklists(){
                this.isPicklistsClick = !this.isPicklistsClick
                this.isSettingClick = false
                this.isReportsClick = false
                this.isSalesAndInvoiceClick = false
            }
            
        }
    }
</script>
<style scoped>
    .showBlock {
        display: block !important;
    }
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }
    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .slide-enter-to, .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }
    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>