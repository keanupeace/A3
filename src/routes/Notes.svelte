<script>
     import {onMount} from 'svelte';
let notesItem = $state('');
let notesList = $state([]);
let doneList = $state([]);


onMount(() => {
     let storedList = localStorage.getItem('storedList');
     if (storedList) {
          notesList = (JSON.parse(storedList));
     }
})

function updateList() {
     return localStorage.setItem('storedList', JSON.stringify(notesList));
}


function addItem() {
     event.preventDefault()
     if (notesItem == '') {
          return;
     }
     notesList = [...notesList,{
          text: notesItem,
          done: false
     }];
     notesItem = '';
     updateList();
}

function removeItem(index) {
     notesList = notesList.toSpliced(index, 1);
     updateList();
}
function nuke () {
     notesList = [];
     localStorage.clear();
}





$inspect(notesList);


</script>

<h2>Notes</h2>
<form onsubmit={addItem}> 
<input type="text" bind:value={notesItem}>
<button type="submit"> + </button>
</form>
<div class="lists">
<div class="notes-list">
     <ul>
          {#each notesList as item, index}
               <li class:done={item.done}>
                    
                    <span>{item.text}</span>
                    <button class="undo-button" type="button" onclick={() => removeItem(index)}>x</button>
               </li>
          {/each}
     </ul>
{#if (notesList.length > 0)}
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
     h2 {
          padding-top: 9vw;
     }
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
     padding-left: 4vw;
}
ul {
          list-style:none;
          padding: 0;
} 




button {
     color: black;
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
     color: black;
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
