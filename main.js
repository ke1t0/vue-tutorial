// https://jp.vuejs.org/v2/examples/todomvc.html
const STORAGE_KEY = 'todos-vuejs-demo'
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}

const app = new Vue({
  el: '#app',
  data: {
    // 使用するデータ,
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' },
    ],
    current: -1,
  },
  methods: {
    // 使用するメソッド,
    doAdd(event, value) {
      const comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0,
      })
      comment.value = ''
    },

    doChangeState(item) {
      item.state = item.state ? 0 : 1
    },

    doRemove(item) {
      const index = this.todos.indexOf(item)
      if (confirm('削除しますか？')) {
        this.todos.splice(index, 1)
      }
    },
  },

  computed: {
    computedTodos() {
      return this.todos.filter((el) => {
        return this.current < 0 ? true : this.current === el.state
      })
    },

    labels() {
      return this.options.reduce((a, b) => {
        return Object.assign(a, { [b.value]: b.label })
      })
    },
  },

  watch: {
    // オプションを使う場合はオブジェクト形式にする
    // 監視するデータ
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler(todos) {
        todoStorage.save(todos)
      },
      // deepでネストしているデータも監視できる
      deep: true,
    },
  },

  created() {
    this.todos = todoStorage.fetch()
  },
})
