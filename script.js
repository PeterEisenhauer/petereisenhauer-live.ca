window.onload = function () {
    // Buttons
    var quickAddBtn = document.getElementById('QuickAdd');
    var quickAddFormDiv = document.querySelector('.quickaddForm');
    var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');
    var searchBtn = document.getElementById('searchBtn');
    var sortOption = document.getElementById('Sort');

    // Form Fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');

    // Divs etc.
    var addBookDiv = document.querySelector('.addbook');

    quickAddBtn.addEventListener("click", function () {
        // display the form div
        quickAddFormDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", function () {
        quickAddFormDiv.style.display = "none";
    });

    sortOption.addEventListener("click", function () {
        sorting();
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);
    addBookDiv.addEventListener("click", updateEntry);
    searchBtn.addEventListener("click", search);

    var addressBook = [];

    function jsonStructure(firstname, lastname, email, phone) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }

    function addToBook() {
        var isEmpty = firstname.value != '' && lastname.value != ''
                && email.value != '' && phone.value != '';
        if (isEmpty) {
            // format the input into a valid JSON structure
            var obj = new jsonStructure(firstname.value, lastname.value,
                    email.value, phone.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            quickAddFormDiv.style.display = "none";
            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(e) {
        // Remove an entry from the addressbook
        if (e.target.classList.contains('delbutton')) {
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function updateEntry(e) {
        // Remove an entry from the addressbook
        if (e.target.classList.contains('updbutton')) {
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            quickAddFormDiv.style.display = "block";
            addToBook();
        }
    }


    function clearForm() {
        var formFields = document.querySelectorAll('.formFields');
        for (var i in formFields) {
            formFields[i].value = '';
        }
    }

    //Comparer Function  
    function GetSortOrder(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    function sorting() {
        //running out of time, sorting limited to firstname only
        addressBook.sort(GetSortOrder("firstname"));
        localStorage['addbook'] = JSON.stringify(addressBook);
        showAddressBook();
    }
    
    function search(){
        var x = document.getElementById('search').value;
       // if(addressBook.find(x)){
            document.write(addressBook.toString(x));
        //}
      //  else{
        //    document.write(x + " is not here");
       // }
    }

    function showAddressBook() {
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                str += '<div class="firstname"><p>' + addressBook[n].firstname
                        + '</p></div>';
                str += '<div class="lastname"><p>' + addressBook[n].lastname
                        + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email
                        + '</p></div>';
                str += '<div class="phone"><p>' + addressBook[n].phone
                        + '</p></div>';
                str += '<div class="update"><a href="#" class="updbutton" data-id="' + n + '">Update</a></div>';
                str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }
    showAddressBook();
}
