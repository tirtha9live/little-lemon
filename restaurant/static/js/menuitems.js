let menulist = document.getElementById('menulist')
let endpoint = '/api/menu-items'
let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

async function getMenuItems() {
    let response = await fetch(endpoint, {
        headers: headers
    });
    let data = (await response).json()
    return data
}

async function displayMenuItems() {
    let data = await getMenuItems()
    menulist.innerHTML = ''
    data.forEach(item => {
        menulist.innerHTML +=
        `<tr id=${item.id}>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td style="word-wrap: break-word;">${item.menu_item_description}</td>
            
             ${is_staff_status()? `<td onClick="deleteitem(${item.id})" className="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </td>` :''}
            
        
        </tr>`
    })
}

displayMenuItems ()


//delete item from db
const deleteMenuItem = async (itemName) => {
    const response = await fetch (`/api/menu-items/?name=${itemName}` , {
        method: 'DELETE' ,
        headers: {
            'Authorization': `Token ${localStorage.getItem ('authToken')}` ,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        displayMenuItems ();  // Refresh the menu
    }
}

// Usage

async function deleteitemfromdb(id) {
    const response = await fetch (`/api/menu-items/${id}` , {
        method: 'DELETE' ,
        headers: {
            // 'Authorization': `Token ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Item Deleted!')
        //displayMenuItems();  // Refresh the menu
    }
}
async function deleteitem(id) {

    let item = document.querySelector(`tr[id="${id}"]`)
    item.innerHTML = ''
    //delete from backend
    await deleteitemfromdb(id)
}




//add menu items
async function add_menuitem(){
   let item =
        {
            "name" : `${document.getElementById('newitem').value}`,
            "price" : `${document.getElementById('newitem-price').value}`,
            "menu_item_description" : `${document.getElementById('newitem-desc').value}`
        }
    let endpoint = '/api/menu-items'
    let response = await fetch(endpoint, {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })
    if(response.status===201){
        alert('item added')
    }else {alert('failed to add item')}
    displayMenuItems()
}


//disable add menu frontend
function showaddremovemenu() {
    let addmenutable = document.getElementById("menulist-add");
    let th_remove = document.getElementById("th-removeitem");

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        if (!is_staff_status()) {

            addmenutable.remove();
            th_remove.remove();
        }
    });
}
// Call the function
showaddremovemenu();
