<template>
  <div class="container-fluid">
    <!-- #### PC用 #### -->
    <div class="pc table-row header">
      <b-row class="edit-box">
        <b-col cols="2">
          <label class="title" >新「やらなぁ~ あかんこと」 </label>
        </b-col>
        <b-col cols="2">
          <form id="tag">
            <input type="text" class="edit-tag" v-model="tag" placeholder="タグ">
          </form>
        </b-col>
        <b-col cols="2">
          <form id="todo">
            <input type="text" class="edit-todo" v-model="todo" placeholder="やらなぁ~ あかんこと">
          </form>
        </b-col>
        <b-col cols="2">
          <b-button class="control-button add" variant="success" @click="addTodo">登録</b-button>
        </b-col>
        <b-col cols="4">
        </b-col>
      </b-row>
      <div class="sepalator"></div>
      <b-row class='query-box'>
        <b-col cols="2">
          <label class="title" >やらなぁ~ あかんの「リスト」 </label>
        </b-col>
        <b-col cols="2">
          <form id="search">
            <input type="text" class="filter" v-model="searchQuery" placeholder="フィルタ">
          </form>
        </b-col>
        <b-col cols="8">
        </b-col>
      </b-row>
      <div class="wrapper attributes header">
        <div v-for="(val, idx) in columns" v-bind:key=idx @click="sortBy(val)" :class="[{ active: sortKey === val }, val, 'header']">
          {{ val }}
          <span class="arrow" :class="sortOrders[val] > 0 ? 'asc' : 'dsc'"></span>
        </div>
      </div>
    </div>
    <!-- #### スマホ用 #### -->
    <div class="mobile">
      <b-container class="table-row header">
        <b-row>
          <label class="title" >やんなきゃリスト</label>
        </b-row>
        <b-row>
          <b-col cols="4">
            <input name="query" class="filter" v-model="searchQuery" placeholder="フィルタ文字列">
          </b-col>
          <b-col cols="4">
            <b-dropdown id="ddown-buttons" split right variant="success" size="sm" class="sorter">
              <template slot="button-content">
                {{sortKey}}
                <span class="arrow" :class="sortOrders[sortKey] > 0 ? 'asc' : 'dsc'"></span>
              </template>
              <b-dropdown-item v-for="(val, idx) in columns" v-bind:key=idx @click="sortBy(val)" :class="[{ active: sortKey == val }, { focus: sortKey == val }]">
                {{ val }}
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="data-field">
      <div v-for="(entry,idx) in Todos" v-bind:key=idx>
        <div class="table-row data" v-bind:style="[selectedId===entry.id ? styleForSelectedRow : idx%2 === 0 ? styleForNonSelectedEvenRow : styleForNonSelectedOddRow]" @click="edit(entry.id)">
          <div class="wrapper attributes data">
            <div v-for="(val, idx) in columns" v-bind:key=idx :class="[val]">
              <span class='mobile-title'>{{val}}:</span>
              <b-form-checkbox
                v-if="val==='complete'"
                v-model="entry.complete"
                @change="completed(entry)">
              </b-form-checkbox>
              <span v-else>{{entry[val]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Todo from '../models/Todo';
import Todos from '../models/Todos';
import SortOrders from '../models/SortOrders';

@Component
export default class TodoList extends Vue {
  name: string = 'TodoList';
  userName: string = 'admin';
  searchQuery: string = '';
  sortKey: string = 'キー';
  todos: Todo[] = [];
  max: number = 100;
  columns: string[] = ['id', 'tag', 'todo', 'complete'];
  sortOrders: SortOrders = new SortOrders();
  selectedId: number = -1;
  styleForSelectedRow: object = {'background-color': '#C0C0C0'};
  styleForNonSelectedEvenRow: object = {'background-color': '#FFFFFF'};
  styleForNonSelectedOddRow: object = {'background-color': '#F5F5F5'};
  tag: string = '';
  todo: string = '';

  // computed
  get Todos(): Todo[] {
    let ret: Todo[] = this.todos;
    const filterKey: string = this.searchQuery && this.searchQuery.toLowerCase();
    if (filterKey) {
      ret = ret.filter((row: Todo) => {
        return row.isIncluded(filterKey);
      });
    }
    const order = this.sortOrders.getOrder(this.sortKey) || -1;
    ret = ret.slice().sort((a: Todo, b: Todo) => {
      const aVal: string = a.getValue(this.sortKey);
      const bVal: string = b.getValue(this.sortKey);
      return (aVal === bVal ? 0 : aVal > bVal ? 1 : -1) * order;
    });
    return ret;
  }

  created(): void {
    console.log('created');
    this.todos = Todos.getInstance().getTodos();
    console.log(this.todos);
  }
  mounted(): void {
    console.log('mounted');
  }

  sortBy(key: string): void {
    this.sortKey = key;
    this.sortOrders.selectKey(this.sortKey);
  }
  edit(id: number): void {
    this.selectedId = id;
  }
  addTodo(): void {
    console.log('addTag tag: ' + this.tag + ', todo : ' + this.todo);
  }

  completed(todo: Todo): void {
    this.$nextTick(() => {
      console.log('adminChanged');
      console.log(todo);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid{
  padding: 5px;
  width: 100%;
}
.pc {
  font-size: 80%;
  font-weight: bold;
  display: block;
}
.mobile {
  font-size: 80%;
  font-weight: bold;
  display: none;
}
.table-row {
  border-bottom: 1px solid #e0e0e0;
  border-collapse: collapse;
  margin-left: 0px;
  margin-right: auto;
}
.table-row.header {
  background-color: rgb(229, 255, 219);
  font-weight: bold;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 4px;
}
.row {
  margin-left: 0px;
}
.control-button {
  float: left;
  line-height: 1em;
  margin-bottom: 4px;
}
.title {
  float: left;
  color:  rgb(26, 92, 0);
}
.filter, .edit-tag, .edit-todo {
  width: 100%;
  margin-bottom: auto;
}
.query-box {
  margin-top: 1em;
}
.wrapper {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
}
.attributes {
  flex-grow: 0;
  -webkit-flex-grow: 0;
}
.wrapper.attributes.header {
  height: 20px;
  margin-top: 1em;
}

.data-field {
  height: 600px;
  resize: vertical;
  overflow-y: auto;
  min-height: 100px;
  max-height: 1000px;
  border:rgba(63, 63, 63, 0.1) solid 1px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
}
.sepalator {
  height: 1px;
  border:rgba(63, 63, 63, 0.1) solid 1px;
}
.detail-field {
  height: 100px;
  resize: vertical;
  overflow-y: auto;
  border:rgba(63, 63, 63, 0.1) solid 1px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
}
.table-row.data {
  height: auto;
  width: 100%;
  padding-left: 6px;
  padding-right: 6px;
}
.wrapper.attributes.data {
  height: auto;
  margin-left: 0px;
  margin-right: 0px;
  padding-top: 6px;
}
.mobile-title {
  display: none;
}
.id {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.complete {
  width: 200px;
  text-align: center;
}
.header.progress {
  background-color: rgb(229, 255, 219);
}
.progress {
  width: 200px;
}
.tag {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.todo {
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
/*
 * Media queries: optimize for different screen widths.
 */
@media screen and (max-device-width: 768px),screen and (max-width: 768px)
{
  .container {
    padding-left: 4px;
  }
  .pc {
    font-size: 80%;
    font-weight: bold;
    display: none;
  }
  .mobile {
    font-size: 80%;
    font-weight: bold;
    display: inline;
  }
  .wrapper.attributes.header {
    height: auto;
  }
  .filter {
    width: 100%;
    font-size: 16px;
    /* transform: scale(0.8); */
  }
  .sorter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    /* float: right; */
  }
  .dropdown .dropdown-menu .dropdown-item:focus {
    outline: none;
    /*
    background-color: #eaeaea;
    color: #1d1e1f;
    */
  }
  .data-field {
    height: 600px;
    overflow-y: auto;
  }
  .wrapper.attributes.data {
    height: auto;
  }
  .mobile-title {
    display: inline;
  }
  .attributes {
    flex-direction: column;
    -webkit-flex-direction: column;
  }
  .attributes div {
    flex-grow: 0;
    -webkit-flex-grow: 0;
  }
  .attributes > div {
    width: 100%;
  }
}
/*
 * General good-look styles
 */
div.active {
  color: rgb(55, 11, 177);
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.0;
}
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #000;
}
.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #000;
}
.sorter .arrow {
  opacity: 1;
}
div.active .arrow {
  opacity: 1;
}
div.active .arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid rgb(55, 11, 177);
}
div.active .arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgb(55, 11, 177);
}
</style>
