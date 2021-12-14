<template>
    <div class="container">
        <b-row v-if="!logs.length" class="mt100 mb70">
            <b-col>
                <b-row>
                    <b-col style="text-align: center">
                        <b-img src="/assets/img/no_result.png" fluid></b-img>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col style="text-align: center">
                        <p class="empty-state__message">
                            No records has been added yet.
                        </p>
                        <p class="empty-state__help">
                            Add a new record by simpley clicking the button on top right side.
                        </p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <ul v-if="logs.length" class="timeline">
            <li v-for="log in logs" 
                :key="log.index"
                :class="{ 'timeline-inverted' : log.alignment == 'right' }"
            >
                <div :class="{ 'timeline-badge primary' : log.what_action == 'Add', 
                                 'timeline-badge success' : log.what_action == 'Edit', 
                                 'timeline-badge danger': log.what_action == 'Delete'}" 
                >
                    <i :class="{ 'fas fa-plus-circle timeline-icon' : log.what_action == 'Add', 
                                 'fas fa-edit timeline-icon' : log.what_action == 'Edit', 
                                 'far fa-trash-alt timeline-icon': log.what_action == 'Delete'}">
                        
                    </i>
                </div>
                
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <h4 class="timeline-title">
                            {{ log.whos_user.name }}
                            <span v-if="log.what_action === 'Add'">Added</span> 
                            <span v-if="log.what_action === 'Edit'">Updated</span> 
                            <span v-if="log.what_action === 'Delete'">Removed</span> 
                            {{ ` a record in ${log.module}` }}
                        </h4>
                        <p>
                            <small class="text-muted">
                                <i class="far fa-clock"></i> {{ log.duration }}
                            </small>
                        </p>
                    </div>
                    <div class="timeline-body">
                        <p>
                            {{ log.description }}
                        </p>
                    </div>
                    <div class="timeline-footer float-right">
                        <b><i>By: {{ log.whos_user.name }}</i></b>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    name: "auditTrailTimeline", 
    props: ['testProps'],
    computed: {
        ...mapState({
            fields: state => state.auditTrail.fields,
        }),
        ...mapGetters({
            auditTrail: 'auditTrail/showDatas'
        }),
        logs() {
            return this.auditTrail;
        },
        getIcons() {
            return {
                'fas fa-plus-circle timeline-icon': this.log.what_action,
                'fas fa-edit timeline-icon': this.log.what_action
            }
        }
    },
    methods: {
        ...mapActions({
            fetchDatas: 'auditTrail/fetchDatas'
        }),
        loadTimeline () {},
    }, 
}
</script>

<style lang="scss">
    @import '@/assets/css/timeline.scss';
</style>