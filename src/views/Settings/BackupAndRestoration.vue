<template>
  <div class="main-content" style="min-height: 530px;">
    <b-row>
      <b-col>
        <b-card>
          <b-card-title>Backup &amp; Restoration</b-card-title>
          <b-card-text>
            <form class="backup-settings contentarea-settings">
              <b-row>
                <b-col md>
                  <b-form-group
                    label="Backup Name:"
                    label-for="backupname"
                    description="Specify the name for your backup"
                  >
                    <b-form-input
                      id="backupname"
                      v-model="form.networktitle"
                      type="text"
                      placeholder="Awesome Backup Name"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group label="Backup Type">
                    <b-form-select 
                      class="bckuptype"
                      id="backuptype"
                      v-model="form.backuptype"
                      :options="options"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button variant="primary" id="create-bckup"> Create Backup </b-button>
              </form>
              <hr>
              <b-row>
                <b-col>
                  <h4>Available Backups</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div style="margin-left: 22px; margin-top: 5px;">
                    <h6 style="margin-bottom: 0 !important;">Client</h6>
                  </div>
                  <div style="margin-left: 12px;">
                    <b-form-select 
                      class="clients"
                      id="backuptype-client"
                      :options="c_options"></b-form-select>
                  </div>
                </b-col>  
              </b-row>
              <b-row>
                <b-col>
                  <div class="available-backups table-responsive">
                    <table role="table" aria-busy="false" aria-colcount="4" class="table b-table table-hover table-sm border">
                      <thead role="rowgroup">
                        <tr role="row" class="">
                          <th role="columnheader" scope="col" aria-colindex="1" class=""><div>Backup</div></th>
                          <th role="columnheader" scope="col" aria-colindex="2" class=""><div>Date</div></th>
                          <th role="columnheader" scope="col" aria-colindex="3" class=""><div>Duration</div></th>
                          <th role="columnheader" scope="col" aria-colindex="4" class=""><div>File Size</div></th>
                          <th role="columnheader" scope="col" aria-colindex="5" class=""><div>Status</div></th>
                          <th role="columnheader" scope="col" aria-colindex="6" class=""><div>&nbsp;</div></th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        <tr role="row" class="">
                          <td aria-colindex="1" role="cell" class="">Simple Backup 1</td>
                          <td aria-colindex="2" role="cell" class="">2021-08-16 05:35:53</td>
                          <td aria-colindex="3" role="cell" class="">4:20:24</td>
                          <td aria-colindex="4" role="cell" class="">500 MB</td>
                          <td aria-colindex="5" role="cell" class=""><span class="s_status green">Completed</span></td>
                          <td aria-colindex="6" role="cell" class=""><a href="#">Download</a> | <a href="#">Restore</a> | <a href="#">Delete</a></td>
                        </tr>
                        <tr role="row" class="">
                          <td aria-colindex="1" role="cell" class="">Test Backup August</td>
                          <td aria-colindex="2" role="cell" class="">2021-08-16 03:20:05</td>
                          <td aria-colindex="3" role="cell" class="">3:25:16</td>
                          <td aria-colindex="4" role="cell" class="">120 MB</td>
                          <td aria-colindex="5" role="cell" class=""><span class="s_status red">Fail</span></td>
                          <td aria-colindex="6" role="cell" class=""><a href="#">Error log</a> | <a href="#">Restore</a> | <a href="#">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col>
                  <h4>Scheduled Backups</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="scheduled-backups table-responsive">
                    <table role="table" aria-busy="false" aria-colcount="4" class="table b-table table-hover table-sm border">
                      <thead role="rowgroup">
                        <tr role="row" class="">
                          <th role="columnheader" scope="col" aria-colindex="1" class=""><div>Name</div></th>
                          <th role="columnheader" scope="col" aria-colindex="2" class=""><div>Date Created</div></th>
                          <th role="columnheader" scope="col" aria-colindex="3" class=""><div>Interval</div></th>
                          <th role="columnheader" scope="col" aria-colindex="4" class=""><div>File Size</div></th>
                          <th role="columnheader" scope="col" aria-colindex="5" class=""><div>Status</div></th>
                          <th role="columnheader" scope="col" aria-colindex="6" class=""><div>&nbsp;</div></th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        <tr role="row" class="">
                          <td aria-colindex="1" role="cell" class="">Cron Job 1</td>
                          <td aria-colindex="2" role="cell" class="">2021-08-16</td>
                          <td aria-colindex="3" role="cell" class="">Every Friday of the week @ 2:00pm</td>
                          <td aria-colindex="4" role="cell" class="">200 MB</td>
                          <td aria-colindex="5" role="cell" class=""><span class="s_status red">Disabled</span></td>
                          <td aria-colindex="6" role="cell" class=""><a href="#">Enable</a> | <a href="#">Edit</a> | <a href="#">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button variant="primary" @click="modalShow = !modalShow" id="btn-add-sched-bckup">Add a Scheduled Backup</b-button>
                  <b-modal v-model="modalShow" hide-footer>
                    <div><h5>Add a scheduled backup</h5></div>
                    <div>
                      <form>
                        <b-row>
                          <b-col>
                            <b-form-group
                              label="Backup Name:"
                              label-for="s_backupname"
                              description="Specify the name for your scheduled backup"
                            >
                              <b-form-input
                                id="s_backupname"
                                v-model="form.networktitle"
                                type="text"
                                placeholder="Awesome Backup Name"
                                class="form-control form-control-sm"
                                required
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <b-form-group
                              label="Interval:"
                              label-for="s_interval"
                              description="Choose your interval to trigger backup"
                            >
                              <b-form-select
                               id="s_interval"
                               v-model="selected" 
                               :options="s_options"></b-form-select>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <b-form-group label="Backup Type">
                              <b-form-select
                                id="backuptype"
                                v-model="form.backuptype"
                                :options="options"
                              ></b-form-select>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-button variant="primary" id="btn-add-sched-backup">Add scheduled backup</b-button>
                      </form>
                    </div>
                  </b-modal>
                </b-col>
              </b-row>
            
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Backup and Restoration",
  data() {
    return {
      form: {
        backupname: null,
        backuptype: null
      },
      selected: null,
      s_options: [
        { text: 'Please select an option', value: null },
        { text: 'Every Friday of the week @ 12:00am', value: 'cmd_1' },
        { text: 'Every Saturday of the week @ 12:00am', value: 'cmd_2' },
        { text: 'Every 15th of the month @ 12:00am', value: 'cmd_3' },
        { text: 'Every 30th of the month @ 12:00am', value: 'cmd_4' }
      ],
      options: [
        { text: 'Please select an option', value: null },
        { text: 'Client 1', value: 'client_1' },
        { text: 'Client 2', value: 'client_2' },
        { text: 'Client 3', value: 'client_3' },
        { text: 'Entire Site', value: 'entire_site' }
      ],
      c_options: [
        { text: 'First Client', value: 'first_client' },
        { text: 'Second Client', value: 'second_client' },
        { text: 'Third Client', value: 'third_client' }
      ],
      modalShow: false
    }    
  }
}

</script>

<style lang="sass">
.custom-control-label > span
  position: relative
  top: -4px

#btn-add-sched-bckup
  margin-left: 22px;

#create-bckup
  background-color: #3e3ef4 !important;
  padding: 0.3rem 0.8rem;
  border-radius: 0.25rem !important; 
  box-shadow: none;

#create-bckup:hover
  background-color: #394eea !important;  
  color: white;

.bckuptype 
  height: 33px;
  margin-top: 8px;
  font-size: 14px;

.clients
  height: 33px;
  margin-top: 8px;
  font-size: 14px;
  margin-left: 8px;
  width: 20%;

</style>