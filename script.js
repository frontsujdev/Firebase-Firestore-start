$(document ).ready(function() {
    $('#createEmployee').click(function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function(){
        //employee form values
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#email").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var yearsOfExperience = $("#yearsOfExperience").val();
        var isfulltime = $('#isFullTime').is(":checked")

        //check if you need to create or update an employee
        if($(this).text() == "Save Changes"){
            var docuName = fname.charAt(0) + "." + lname;
            db.collection("employees").doc(docuName).set({
                fName: fname,
                lName: lname,
                email: email,
                age: age,
                gender: gender,
                yearsofExperience: yearsOfExperience,
                isFullTime: isfulltime
            }).then(function(docRef){
                $('#operationStatus').html('<div class="alert alert-success><strong>Success!</strong>Employee was created!</div>')
                .delay(2500).fadeOut('slow');
                $('.employeeForm').css("display", "none");
            }).catch(function(eror){
                $('#operationStatus').html('<div class="alert alert-danter"><strong>Error!</strong>Employee was not created!</div>')
                .delay(2500).fadeOut('slow');
            })
        }
        else{
            // Create a reference to the document by following the same pattern of the document name.
            // Example: Ervis Trupja -> E.Trupja
            var docuName = fname.charAt(0) + '.' + lname;
            var sfDocRef = db.collection("employees").doc(docuName);
            sfDocRef.set({
                fName: fname,
                lName: lname,
                email: email,
                age: age,
                gender: gender,
                yearsofExperience: yearsOfExperience,
                isFullTime: isfulltime
            },
            {
                merge: true
            }).then(function(docRef){
                $('#operationStatus').html('<div class="alert alert-success><strong>Success!</strong>Employee was created!</div>')
                .delay(2500).fadeOut('slow');
                $('.employeeForm').css("display", "none");
            }).catch(function(eror){
                $('#operationStatus').html('<div class="alert alert-danter"><strong>Error!</strong>Employee was not created!</div>')
                .delay(2500).fadeOut('slow');
            })
        }
    });

    // Cancel the Employee form
    $('#cancel').click(function(){
        $('.employeeForm').css("display", "none");
    });

    // Get the data of the employee you want to edit
    $("tbody.tbodyData").on("click","td.editEmployee", function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Update Employee');

        $("#fname").val($(this).closest('tr').find('.fname').text());
        $("#lname").val($(this).closest('tr').find('.lname').text());
        $("#email").val($(this).closest('tr').find('.email').text());
        $("#age").val($(this).closest('tr').find('.age').text());
        $("#gender").val($(this).closest('tr').find('.gender').text());
        $("#yearsOfExperience").val($(this).closest('tr').find('.yearsofexperience').text());
        $("#isFullTime").prop('checked', $(this).closest('tr').find('.isfulltime').text() === 'true');
    });

    // Delete employee
    $("tbody.tbodyData").on("click","td.deleteEmployee", function(){
        //Get the Employee Data
        var fName = $(this).closest('tr').find('.fname').text(); //First Name
        var lName = $(this).closest('tr').find('.lname').text(); //Last Name

        var docuName = fName.charAt(0) + '.' + lName;
        var sfDocRef = db.collection("employees").doc(docuName).delete().then(function(docRef){
            $('#operationStatus').html('<div class="alert alert-success><strong>Success!</strong>Employee was deleted!</div>')
            .delay(2500).fadeOut('slow');
            $('.employeeForm').css("display", "none");
        }).catch(function(eror){
            $('#operationStatus').html('<div class="alert alert-danter"><strong>Error!</strong>Employee was not deleted!</div>')
            .delay(2500).fadeOut('slow');
        })
    });

});
db.collection("employees").onSnapshot(function(snapShot) {
    snapShot.docChanges().forEach(function(change){
        if (change.type === "added") {
            console.log("Employee Added");
        }
        if (change.type === "modified") {
            console.log("Employee Modified");
        }
        if (change.type === "removed") {
            console.log("Employee Removed");
        }
    })
    LoadTableData(snapShot);
});
//get all the data on app startup
function LoadTableData(querySnapshot){
    var tableRow = '';
    // console.log(querySnapshot);
    querySnapshot.forEach(function(doc){
        var document = doc.data();
        tableRow += '<tr>';
        tableRow += '<td class="fname">' + document.fName + '</td>';
        tableRow += '<td class="lname">' + document.lName + '</td>';
        tableRow += '<td class="email">' + document.email + '</td>';
        tableRow += '<td class="age">' + document.age + '</td>';
        tableRow += '<td class="gender">' + document.gender + '</td>';
        tableRow += '<td class="yearsofexperience">' + document.yearsofExperience + '</td>';
        tableRow += '<td class="isfulltime">' + document.isFullTime + '</td>';
        tableRow += '<td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>';
        tableRow += '<td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>';
        tableRow += '<tr>';
    });
    $('tbody.tbodyData').html(tableRow);
}