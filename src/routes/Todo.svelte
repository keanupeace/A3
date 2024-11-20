<script>
let todoItem = $state('');
let todoList = $state([]);

function addItem() {
     event.preventDefault()
     if (todoItem == '') {
          return;
     }
     todoList.push(todoItem);
     todoItem = '';
}
$inspect(todoList);

</script>
<form onsubmit={addItem}> 
<input type="text" bind:value={todoItem}>
<button type="submit"> Add</button>
</form>

<ul>
     {#each todoList as Item}
          <li>{Item}</li>
     {/each}
</ul>

<style>


</style>