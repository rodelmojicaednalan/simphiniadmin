<template>
    <div class="main-content" style="min-height: 530px;">
        <b-row>
            <b-col>
                <div class="float-left">
                    <b-card-title>Audit Trail</b-card-title>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-tabs>
                    <b-tab no-body title="List View">
                        <Lists ref="listRef"/>
                    </b-tab>
                    <b-tab no-body title="Timeline View" @click="clickParent">
                        <Timeline ref="timelineRef" />
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Timeline from '@/components/Pages/Reports/AuditTrail/TimeLine';
import Lists from '@/components/Pages/Reports/AuditTrail/List';
export default {
    components: {
        Timeline, 
        Lists
    },
    methods: {
        clickParent() {
            let child = this.$refs.timelineRef;
            child.loadTimeline();
        },
    }, 
}
</script>