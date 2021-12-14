<template>
  <div>
    <div v-if="hideHeader">
      <b-table hover outlined :items="items" thead-class="hidden_header" small>
        <template v-if="counter" #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template v-if="withAvatar" #cell(avatar)="data">
          <div style="width: 30px">
            <img :src="data.item.avatar" class="rounded-circle mr-1 img-fluid">
          </div>
        </template>
      </b-table>
    </div>
    <div v-else>
      <b-table hover outlined :items="items" :fields="fields" small>
        <template v-if="counter" #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template v-if="withAvatar" #cell(avatar)="data">
          <div style="width: 30px">
            <img :src="data.item.avatar" class="rounded-circle mr-1 img-fluid">
          </div>
        </template>
        <template #cell(action)="data">
          <b-button variant="success" @click="successClick({id:data.item.id,text:'sample text'})">{{ data.item.update.label }}</b-button>
          <b-button variant="danger" class="ml-2" @click="$emit('showDeleteModal',{id:data.item.id,name:data.item.name})">{{ data.item.delete.label }}</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array
    },
    withAvatar: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array
    }
  }
}
</script>