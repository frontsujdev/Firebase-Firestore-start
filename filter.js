$(document).ready(function() {
    $('#onlyMalesFilter').click(function(){
        console.log('onlyMalesFilter Filter executed');
        employeesRef.where("gender", "==", "Male")
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $('#fullTimeFilter').click(function(){
        console.log('fullTimeFilter Filter executed');
        employeesRef.where("isFullTime", "==", true)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $('#olderThenFilter').click(function(){
        console.log('olderThenFilter Filter executed');
        employeesRef.where("age", ">=", 30)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $('#ageBetweenFilter').click(function(){
        console.log('ageBetweenFilter Filter executed');
        employeesRef.where("age", ">=", 35).where("age", "<=", 50)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $('#yearsOfExperienceFilter').click(function(){
        console.log('yearsOfExperienceFilter Filter executed');
        employeesRef.where("gender", ">=", "female")
        employeesRef.where("yearsofExperience", ">=", 5).where("yearsofExperience", "<=", 10)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $("#searchEmployee" ).change(function() {
        console.log('You entered: ', $(this).val());
        var searchValue = $(this).val();
        employeesRef.where("fName", "==", searchValue)
            .onSnapshot(function(querySnapshot){
                LoadTableData(querySnapshot);
            })
      });

    $('#clearFilter').click(function(){
        console.log('clearFilter Filter executed');
        employeesRef.orderBy("fName",  "desc").limit(5).get().then(function(querySnapshot){
            LoadTableData(querySnapshot);
        })
    });
});