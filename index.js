function update()
{
    if((document.getElementById('title').value != '') && (document.getElementById('description').value != ''))
    {
        let tit=document.getElementById('title').value;
        let desc=document.getElementById('description').value;
        if(localStorage.getItem('itemsJson')==null)
        {
            let itemsJsonArray = [];
            itemsJsonArray.push([tit,desc]);
            localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
        }
        else
        {
            let itemsJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
            itemsJsonArray.push([tit,desc]);
            localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
        }
    }

    document.getElementById('title').value='';
    document.getElementById('description').value='';

    let str="";

    if(localStorage.getItem('itemsJson')!=null)
    {
        let itemsJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
        
        itemsJsonArray.forEach(function(element,index)
        {
            str+=`
            <tr>
                <th scope="row">${index+1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary btn-sm delete" onclick='del(${index})'>Delete</button></td>
            </tr>`
        })
    }
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML=str;
}


document.getElementById('add').addEventListener('click',update);
update();


function del(x)
{
    let itemsJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
    itemsJsonArray.splice(x,1);
    localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
    update();
}


function clearstorage()
{
    if(confirm("Do you really want to clear?"))
    {
        console.log("clearing the storage");
        localStorage.clear();
        update();
    }
}