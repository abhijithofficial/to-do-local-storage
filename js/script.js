$(document).ready(function () {
  let btnAdd = $('.add-task-btn');
  let addData = $('.add-i-task');
  let showData = $('.list-tasks');
  let idGenerator = 0;
  // Retrive Data from LocalStorage
  let retrievedToDoList = JSON.parse(localStorage.getItem('retrievedToDoList'));

  //Display LocalStorage items if exist
  if (retrievedToDoList != null)
    {
      data = retrievedToDoList;
      for (var i = 0; i < data.length; i++) {
        let elem =  `<li id="${i}" class="list-task">
            <div class="list-task-check col-1">
              <input type="checkbox" id="task-done">
            </div>
            <div class="list-task-content col-2">
              ${data[i]['content']}
            </div>
            <div class="list-task-remove col-3">

            </div>
        </li>`;
        showData.append(elem);
      }
      idGenerator = i;
    }
  // Add task

  btnAdd.on('click',function (e) {
    if (retrievedToDoList == null) {
      retrievedToDoList = [];
      idGenerator = 0;
    }
    retrievedToDoList.push({'content':addData.val()});
    localStorage.setItem('retrievedToDoList', JSON.stringify(retrievedToDoList));
    let elem =  `<li id="${idGenerator}" class="list-task">
        <div class="list-task-check col-1">
          <input type="checkbox" id="task-done">
        </div>
        <div class="list-task-content col-2">
          ${addData.val()}
        </div>
        <div class="list-task-remove col-3">

        </div>
    </li>`;
    idGenerator++;
    showData.append(elem);
    addData.val('');
  })

  showData.on('click','.list-task-remove',function () {
    let i = $(this).parent().attr('id');
    retrievedToDoList.splice(i, 1);
    localStorage.setItem('retrievedToDoList', JSON.stringify(retrievedToDoList));
    $(this).parent().remove();
    retrievedToDoList = JSON.parse(localStorage.getItem('retrievedToDoList'));

  })

  showData.on('change','#task-done',function functionName() {
    $(this).parent().next().toggleClass('checked');
  })

  // Sorting
  $( function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
} );

})
