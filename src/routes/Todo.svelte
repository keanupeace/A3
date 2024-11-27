<script>
let todoItem = $state('');
let todoList = $state([]);
let doneList = $state([]);

function addItem() {
     event.preventDefault()
     if (todoItem == '') {
          return;
     }
     todoList = [...todoList,{
          text: todoItem,
          done: false
     }];
     todoItem = '';
}

function removeItem(index) {
     todoList = todoList.toSpliced(index, 1);
}
function nuke () {
     todoList = [];
}
$effect(() => {
     doneList = todoList.filter((item) => item.done);
})

$inspect(todoList);
$inspect(doneList);

</script>
<form onsubmit={addItem}> 
<input type="text" bind:value={todoItem}>
<button type="submit"> + </button>
</form>
<div class="todo-list">
<ul>
     {#each todoList as Item, index}
          <li>
               <input type="checkbox" bind:checked={Item.done}>
               <span class:done={Item.done}>{Item.text}</span>
               <button type="button" onclick={()=> removeItem(index)}>x</button>
          </li>
     {/each}
</ul>
{#if (todoList.length > 0)}
<button type="button" onclick={nuke}>Clear</button>
{:else}
     <button type="button" onclick={nuke}>Nuclear Option</button>
{/if}
</div>

{#if (doneList.length > 0)}
<div class="done-list">
     <h2>Done Items</h2>
     {#each doneList as item}
     <li>
          {item.text}
     </li>
{/each}
</div>
{/if}
<style>
     ul {
          list-style:none;
     } 
span.done {
     color: rgb(49, 49, 49);
     text-decoration: line-through;
}
button {
     background-color: white;
}

</style>