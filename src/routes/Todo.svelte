<script>
     import {onMount} from 'svelte';
let todoItem = $state('');
let todoList = $state([]);
let doneList = $state([]);

onMount(() => {
     let storedList = localStorage.getItem('storedList');
     if (storedList) {
          todoList = (JSON.parse(storedList));
     }
})

function updateList() {
     return localStorage.setItem('storedList', JSON.stringify(todoList));
}


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
     updateList();
}

function removeItem(index) {
     todoList = todoList.toSpliced(index, 1);
     updateList();
}
function nuke () {
     todoList = [];
     localStorage.clear();
}

function clearDone() {
     todoList = todoList.filter((item) => !item.done);
     updateList();
}

$effect(() => {
     doneList = todoList.filter((item) => item.done);
})
function undoThis(item) {
     item.done = !item.done;
}

$inspect(todoList);
$inspect(doneList);

</script>
<form onsubmit={addItem}> 
<input type="text" bind:value={todoItem}>
<button type="submit"> + </button>
</form>
<div class="lists">
<div class="todo-list">
     <ul>
          {#each todoList as item, index}
               <li class:done={item.done}>
                    <input type="checkbox" bind:checked={item.done} onchange={uodateList}>
                    <span>{item.text}</span>
                    <button class="undo-button" type="button" onclick={() => removeItem(index)}>x</button>
               </li>
          {/each}
     </ul>
{#if (todoList.length > 0)}
<button class="clear-button" type="button" onclick={nuke}>Clear</button>
{:else}
     <button class="clear-button" type="button" onclick={nuke}>Clear</button>
{/if}
</div>

{#if (doneList.length > 0)}
<div class="done-list">
     <h2>Complete!</h2>
     {#each doneList as item}
     <li>
          <span>{item.text}</span>
               <button class="undo-button" type="button" onclick={()=> undoThis(item)}>x</button>
     </li>
{/each}
</div>
{/if}
</div>
<style>
form {
          display: flex;
}
.lists {
     display: flex;
     justify-content: space-between;
     & > div {
          flex-basis: 50%;
          flex-shrink: 0;
     }
}
ul {
          list-style:none;
          padding: 0;
} 
li.done {
     display: none;
     
}

.done-list {
     padding: 2vw;
     list-style:none;
}

button {
     background-color: white;
}
input[type="text"] {
     border-radius: 50px;
     padding: 0.6em 1rem;
}
form button {
     border-radius: 50%;
     cursor: pointer;
     margin-left: 1vw;
     padding: 0.6em 1rem;
     font-size: 1rem;
     &:hover {
          background-color: #dfdfdf;
     }
}
.clear-button {
     border-radius: 47%;
     cursor: pointer;
     margin-left: 3.8vw;
     padding: .5em;
     &:hover {
          background-color: #dfdfdf;
     }
}
.undo-button {
     border-radius: 50%;
     cursor: pointer;
     margin: .5vw;
     padding: 0.2em .3rem;
     font-size: .6rem;
     &:hover {
          background-color: #dfdfdf;
     }
}
@media screen and (max-width: 500px) {
     .lists {
     padding-left: 20%;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     & > div {
          flex-basis: 50%;
          flex-shrink: 0;
     }
    
}


}

</style>