import './App.css';
import { DataStore } from 'aws-amplify/datastore';
import { Todo } from './models';

function App() {

  async function showTodos() {
    const models = await DataStore.query(Todo);
    console.log(models);
  }

  async function addTodo() {
    await DataStore.save(
      new Todo({
        "name": "Lorem ipsum dolor sit amet",
        "description": "Lorem ipsum dolor sit amet"
      })
    );
  }

  async function updateTodo() {
    const original = await DataStore.query(Todo, "980ce83f-e9d2-4754-9e93-7a4ea15bb035");
    await DataStore.save(Todo.copyOf(original, item => {
      item.name = `title ${Date.now()}`
    }));
  }

  async function deleteTodo() {
    const modelToDelete = await DataStore.query(Todo, "980ce83f-e9d2-4754-9e93-7a4ea15bb035");
    DataStore.delete(modelToDelete);
  }

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={addTodo}>Add</button>
      <button onClick={showTodos}>Show</button>
      <button onClick={updateTodo}>Update</button>
      <button onClick={deleteTodo}>Delete</button>
      </header>
    </div>
  );
}

export default App;
