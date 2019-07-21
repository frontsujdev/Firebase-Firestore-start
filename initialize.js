var db = firebase.firestore();
var employeesRef = db.collection("employees");
employeesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    })
});
/*
employeesRef.doc("R.Dikles").set({
    fName: "Ranico",
    lName: "Dikles",
    email: "rdikesl@hatena.ne.jp",
    age: 39,
    gender: "female",
    yearsofExperience: 9,
    isFullTime: true,
});
employeesRef.doc("S.Dikles").set({
    fName: "Ranico",
    lName: "Dikles",
    email: "rdikesl@hatena.ne.jp",
    age: 39,
    gender: "female",
    yearsofExperience: 9,
    isFullTime: true,
});
employeesRef.doc("F.Dikles").set({
    fName: "Ranico",
    lName: "Dikles",
    email: "rdikesl@hatena.ne.jp",
    age: 39,
    gender: "female",
    yearsofExperience: 9,
    isFullTime: true,
});
employeesRef.doc("I.Dikles").set({
    fName: "Ranico",
    lName: "Dikles",
    email: "rdikesl@hatena.ne.jp",
    age: 39,
    gender: "female",
    yearsofExperience: 9,
    isFullTime: true,
});
employeesRef.doc("U.Dikles").set({
    fName: "Ranico",
    lName: "Dikles",
    email: "rdikesl@hatena.ne.jp",
    age: 39,
    gender: "female",
    yearsofExperience: 9,
    isFullTime: true,
});
*/