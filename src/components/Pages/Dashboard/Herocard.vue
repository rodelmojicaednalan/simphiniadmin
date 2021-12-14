<template>
  <div>
    <b-row>
      <b-col>
        <h3>Dashboard</h3>
        <br>
        <b-row>
          <b-col>
            <b-card bg-variant="primary">
              <b-card-title>{{ clientCount }}</b-card-title>
              <b-card-text class="mb-0">Active Clients</b-card-text>
              <div class="card-icon"><i class="fa fa-users fa-3x"></i></div>
            </b-card>
          </b-col>
          <b-col md class="col-card-hero">
            <b-card bg-variant="success" class="h-100">
              <b-card-title>$11, 605</b-card-title>
              <b-card-text class="mb-0">Monthly Revenue</b-card-text>
              <div class="card-icon">
                <i class="fas fa-dollar-sign fa-3x"></i>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="align-self-stretch pb-3">
          <b-col md class="col-card-hero">
            <b-card bg-variant="info" class="h-100">
              <b-card-title>106</b-card-title>
              <b-card-text class="mb-0">Inquiries</b-card-text>
              <div class="card-icon"><i class="fas fa-comment fa-3x"></i></div>
            </b-card>
          </b-col>
          <b-col md class="col-card-hero">
            <b-card class="h-100 dashboard-card">
              <b-card-title>?</b-card-title>
              <b-card-text class="mb-0">Vacant</b-card-text>
              <div class="card-icon"><i class="fas fa-question fa-3x"></i></div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col md>
        <h3>Quick Links</h3>
        <br />
        <b-row>
          <b-col md>
            <b-card>
              <b-card-title>
                <b-link class="normal-link" to="/admin/sales_and_invoice/invoice">
                  <div class="quick-links">
                    <div class="header">
                      Invoice
                    </div>
                    <div class="icon">
                      <i class="fas fa-file-invoice"></i>
                    </div>
                  </div>
                </b-link>
              </b-card-title>
            </b-card>
          </b-col>
          <b-col md>
            <b-card>
              <b-card-title>
                <b-link class="normal-link" to="/admin/settings/backup-restoration">
                  <div class="quick-links">
                    <div class="header">
                      Client Backup
                    </div>
                    <div class="icon">
                      <i class="fas fa-database"></i>
                    </div>
                  </div>
                </b-link>
              </b-card-title>
            </b-card>
          </b-col>
          <b-col md>
            <b-card>
              <b-card-title>
                <b-link class="normal-link" to="/admin/users/create">
                  <div class="quick-links">
                    <div class="header">
                      Add User
                    </div>
                    <div class="icon">
                      <i class="fas fa-user-plus"></i>
                    </div>
                  </div>
                </b-link>
              </b-card-title>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
             <b-card>
              <b-card-title>
                <b-link class="normal-link">
                  <div class="quick-links">
                    <div class="header">
                      Logs and Notifications
                    </div>
                    <div class="icon">
                      <i class="fas fa-bell"></i>
                    </div>
                  </div>
                </b-link>
              </b-card-title>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-card-title>
                <b-link class="normal-link" to="/admin/settings/email">
                  <div class="quick-links">
                    <div class="header">
                      Manage Emails
                    </div>
                    <div class="icon">
                      <i class="fas fa-envelope-square"></i>
                    </div>
                  </div>
                </b-link>
              </b-card-title>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-card-title>
                <b-link class="normal-link" to="/admin/users">
                  <div class="quick-links">
                    <div class="header">
                      Suspend Client
                    </div>
                    <div class="icon">
                      <i class="fas fa-ban"></i>
                    </div>
                  </div>
                </b-link>
              </b-card-title>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script scope>
export default {
  props: ["clientCount"],
};
</script>

<style scoped>
.card-icon {
  position: absolute;
  right: 35px;
  top: 30%;
}
.fa-3x {
  font-size: 3em;
}
.quick-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  cursor: pointer;
}
.quick-links .header {
  font-size: 18px;
}
.icon i {
  font-size: 35px;
}
.normal-link {
  text-decoration: none;
  color: #6c757d;
  font-weight: 700;
}
</style>