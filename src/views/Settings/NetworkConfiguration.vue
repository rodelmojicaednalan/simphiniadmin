<template>
  <div class="main-content" style="min-height: 530px;">
    <b-row>
      <b-col>
        <b-card>
          <b-card-title>Network Configuration</b-card-title>
          <b-card-text>
            <form class="network-settings contentarea-settings">
              <b-row>
                <b-col>
                  <h2>Domain Mapping</h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col md>
                  <fieldset class="domain-mapping">
                  <div>Active Domains</div>
                  <textarea class="active-domains" name="active_domains" readonly placeholder="awesome.domain.com
backup.simphini.com
sampledomain.simphini.com">
                  </textarea>
                  <p>These are the domains currently mapped to your website.</p>
                </fieldset>
                </b-col>
                <b-col md>
                  <div>&nbsp;</div>
                  <fieldset class="domain-mapping">
                  <div class="add-new-domain">
                    <input type="text" placeholder="your.domain.com">
                    <b-button variant="primary">Add Domain</b-button>
                  </div>
                  </fieldset>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <h2>Network Settings</h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col md>
                  <b-form-group
                    label="Network Title:"
                    label-for="network-title"
                    description="Specify the network title."
                  >
                    <b-form-input
                      id="networktitle"
                      v-model="form.networktitle"
                      type="text"
                      placeholder="Awesome Network Title"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="Network Admin Email:"
                    label-for="network-adminemail"
                    description="This email address will receive notifications. Registration and support emails will also come from this address."
                  >
                    <b-form-input
                      id="network-adminemail"
                      v-model="form.networkadminemail"
                      type="email"
                      placeholder="admmin@simphini.com"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <h2>Network Setup</h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col md>
                  <b-form-group
                    label="Subdirectory Install:"
                    label-for="subdirectoryinstall"
                    description="The sites in your Simphini app will be installed."
                  >
                    <b-form-input
                      id="subdirectoryinstall"
                      v-model="form.subdirectoryinstall"
                      type="text"
                      placeholder="home\www\simphini.com\public_html\subdirectory"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="Server Address:"
                    label-for="serveraddress"
                    description="The internet address of your network."
                  >
                    <b-form-input
                      id="serveraddress"
                      v-model="form.serveraddress"
                      type="text"
                      placeholder="apache.lan"
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
  name: "Network Configuration",
  data() {
    return {
      form: {
        networktitle: null,
        networkadminemail: null,
        subdirectoryinstall: null,
        serveraddress: null
      }
    }
  }
}
</script>

<style lang="sass">
.custom-control-label > span
  position: relative
  top: -4px
</style>