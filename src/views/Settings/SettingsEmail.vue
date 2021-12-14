<template>
  <div class="main-content" style="min-height: 530px;">
    <b-row>
      <b-col>
        <b-card>
          <b-card-title>Email Settings</b-card-title>
          <b-card-text>
            <form class="email-settings contentarea-settings">
              <b-row>
                <b-col md>
                  <b-form-group
                    label="Email:"
                    label-for="email"
                    description='This email is displayed as "From" in any notification emails.'
                  >
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter email"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="Name:"
                    label-for="admin-name"
                    description="This will display as sender of the notification email."
                  >
                    <b-form-input
                      id="admin-name"
                      v-model="form.name"
                      type="text"
                      placeholder="Enter email"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md>
                  <b-form-group
                    label="Enable SMTP:"
                    label-for="smtp-enable"                   
                  >
                    <b-form-checkbox v-model="form.smtp_enabled" name="smtp-enable" switch>
                      Enable SMTP
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="SMTP Host:"
                    label-for="smtp-host"
                  >
                    <b-form-input
                      id="smtp-host"
                      v-model="form.smtp_host"
                      type="text"
                      placeholder="SMTP Host"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="SMTP Port:"
                    label-for="smtp-port"
                  >
                    <b-form-input
                      id="smtp-port"
                      v-model="form.smtp_port"
                      type="text"
                      placeholder="SMTP Port"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md>
                  <b-form-group label="SMTP Encryption">
                    <b-form-radio-group
                      id="encryption-1"
                      v-model="form.smtp_encryption"
                      :options="options"
                    ></b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="SMTP Username:"
                    label-for="smtp-username"
                  >
                    <b-form-input
                      id="smtp-username"
                      v-model="form.smtp_username"
                      type="text"
                      placeholder="SMTP Username"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="SMTP Password:"
                    label-for="smtp-password"
                  >
                    <b-form-input
                      id="smtp-password"
                      v-model="form.smtp_password"
                      type="text"
                      placeholder="SMTP Password"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button variant="primary">Save Settings</b-button>    
            </form>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Email Settings",
  data() {
    return {
      form: {
        email: null,
        name: null,
        smtp_enable: null,
        smtp_host: null,
        smtp_port: null
      },
      options: [
        { text: 'SSL', value: 'ssl' },
        { text: 'TLS', value: 'tls' },
      ]
    }
  }
}
</script>

<style lang="sass">
.custom-control-label > span
  position: relative
  top: -4px
</style>